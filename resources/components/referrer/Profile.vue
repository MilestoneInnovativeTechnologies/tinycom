<template>
    <b-card border-variant="light" header="Update Profile" class="mt-3 mx-auto" style="max-width: 680px">
        <b-card-body>
            <b-form-group label="Name" label-cols="3" label-align="right">
                <b-form-input v-model="name" trim></b-form-input>
            </b-form-group>
            <b-form-group label="Phone" label-cols="3" label-align="right">
                <b-form-input v-model="phone" trim></b-form-input>
            </b-form-group>
            <b-form-group label="Email" label-cols="3" label-align="right">
                <b-form-input v-model="email" trim></b-form-input>
            </b-form-group>
            <b-form-group description="Leave blank to have password unchanged" label="Password" label-cols="3" label-align="right">
                <b-form-input v-model="password" type="password"></b-form-input>
            </b-form-group>
            <b-button variant="outline-warning" class="offset-3" :disabled="disabled" @click.prevent="update"><b-spinner small v-show="disabled" class="mb-1 mr-2"></b-spinner>Update</b-button>
        </b-card-body>
    </b-card>
</template>

<script>
    import { BCard,BCardBody,BFormGroup,BFormInput,BButton,BSpinner,ToastPlugin } from 'bootstrap-vue'
    Vue.use(ToastPlugin);

    export default {
        name: "Profile",
        components: { BCard,BCardBody,BFormGroup,BFormInput,BButton,BSpinner },
        data(){ return {
            name: _.get(this.$store.getters,'PROFILE/name'),
            email: _.get(this.$store.getters,['PROFILE/email']),
            phone: _.get(this.$store.getters,['PROFILE/phone']),
            password: '', disabled: false
        } },
        methods: {
            update(){
                this.disabled = true;
                this.$store.dispatch('SERVER/post',{ item:'profile',action:'update',data:{ name:this.name,email:this.email,phone:this.phone,password:this.password } })
                .then(this.updateResponse)
            },
            updateResponse({ message,variant }){
                this.disabled = false;
                this.$bvToast.toast(message,{ title:'Profile Update',variant })
                this.password = '';
            }
        }
    }
</script>