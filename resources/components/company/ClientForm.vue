<template>
    <b-container>
        <b-form-group label-cols="3" label-align="right" label="Name"><b-form-input v-model="name" required></b-form-input></b-form-group>
        <b-form-group label-cols="3" label-align="right" label="Phone"><b-form-input v-model="phone" required></b-form-input></b-form-group>
        <b-form-group label-cols="3" label-align="right" label="Email"><b-form-input v-model="email" required></b-form-input></b-form-group>
        <b-form-group label-cols="3" label-align="right" label="Login Password"><b-form-input v-model="password" required></b-form-input></b-form-group>
        <b-button class="offset-3" variant="outline-info" :disabled="disabled" @click.prevent="submit"><b-spinner small v-show="disabled" class="mb-1 mr-2"></b-spinner>Submit</b-button>
    </b-container>
</template>

<script>
    export default {
        name: "ClientForm",
        data(){ return {
            id: '', action: 'create', fields: ['id','name','email','phone','password'],
            name: '', email: '', phone: '', password: '',
            disabled: false
        } },
        computed: {
            post(){ return _.zipObject(this.fields,this.fields.map(key => this[key])) },
        },
        methods: {
            submit(){ this.disabled = true; this.$post('client',this.action,this.post).then(this.submitted); },
            submitted(data){ this.disabled = false; this.$emit('response',data) }
        },
        created() {
            if(this.$attrs['client']){
                let client = this.$attrs['client'];
                this.action = 'update'; _.forEach(this.fields,key => this[key] = client[key] )
            }
        }
    }
</script>