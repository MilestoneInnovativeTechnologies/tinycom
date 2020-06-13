<template>
    <div>
        <b-button block variant="outline-primary" v-b-modal="id"><b-icon icon="box-arrow-up-right" class="mr-2"></b-icon>Add New Company</b-button>
        <b-modal :id="id" hide-footer>
            <b-form-group label-cols="3" label-align="right" label="Company Name"><b-form-input v-model="post.company" required></b-form-input></b-form-group>
            <b-form-group label-cols="3" label-align="right" label="Domain">
                <b-input-group>
                    <b-form-input v-model="post.sub" required></b-form-input>
                    <b-input-group-append>
                        <b-form-select v-model="post.host" required :options="$store.state.COMPANIES.DOMAINS"></b-form-select>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
            <b-form-group label-cols="3" label-align="right" label="Admin Password"><b-form-input v-model="post.password" required></b-form-input></b-form-group>
            <b-button block variant="info" @click.prevent="submit" class="mt-3">SUBMIT</b-button>
        </b-modal>
    </div>
</template>

<script>
    import { ButtonPlugin,FormGroupPlugin,IconsPlugin,FormSelectPlugin,FormInputPlugin,InputGroupPlugin,ToastPlugin } from 'bootstrap-vue'
    Vue.use(FormGroupPlugin); Vue.use(ButtonPlugin); Vue.use(IconsPlugin); Vue.use(FormSelectPlugin); Vue.use(FormInputPlugin); Vue.use(InputGroupPlugin); Vue.use(ToastPlugin);

    export default {
        name: "NewCompanySetup",
        data(){ return {
            fields: ['user','company','sub','host','password','domain'],
            post: {
                company: null, sub: null, host: null, password: null
            }
        } },
        computed: {
            id(){ return 'add-new-company-modal-' + Math.random() },
            user(){ return this.$store.state.PROFILE.USER.id },
            domain(){ return [this.post.sub,this.post.host].join('.') },
        },
        methods: {
            submit(){
                let post = _.zipObject(this.fields,_.map(this.fields.map(field => _.has(this.post,field) ? this.post[field] : (this[field] || ''))))
                this.$post('company','create',post).then(({ message,variant }) => this.$bvToast.toast(message,{ variant,modal:this.$bvModal.hide(this.id) }))
            }
        }
    }
</script>