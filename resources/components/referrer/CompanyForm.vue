<template>
    <b-container>
        <b-form-group v-if="client_input" label-cols="3" label-align="right" label="Client">
            <b-form-select v-model="user" required :options="option_clients"></b-form-select>
        </b-form-group>
        <b-form-group label-cols="3" label-align="right" label="Company Name"><b-form-input v-model="company" required></b-form-input></b-form-group>
        <b-form-group label-cols="3" label-align="right" label="Domain">
            <b-input-group>
                <b-form-input v-model="sub" required></b-form-input>
                <b-input-group-append>
                    <b-form-select v-model="host" required :options="$store.state.COMPANIES.DOMAINS"></b-form-select>
                </b-input-group-append>
            </b-input-group>
        </b-form-group>
        <b-form-group label-cols="3" label-align="right" label="Admin Password"><b-form-input v-model="password" required></b-form-input></b-form-group>
        <b-button class="offset-3" variant="outline-info" :disabled="disabled" @click.prevent="submit"><b-spinner small v-show="disabled" class="mb-1 mr-2"></b-spinner>Submit</b-button>
    </b-container>
</template>

<script>
    import { BSpinner } from 'bootstrap-vue';

    export default {
        name: "CompanyForm",
        components: { BSpinner },
        data(){ return {
            client_input: true,
            fields: ['company','domain','password','user','referrer','sub'],
            company: '', sub: '', host: '', password: '', user: '',
            disabled: false
        } },
        computed: {
            option_clients(){ return _.map(this.$store.state.CLIENTS.CLIENTS,({ id,name }) => _.zipObject(['value','text'],[id,name])) },
            domain: {
                get(){ return [this.sub,this.host].join('.') },
                set(d){ let { domain,sub } = this.$store.getters['COMPANIES/dParts'](d); this.host = domain; this.sub = sub; },
            },
            referrer(){ return this.$store.state.PROFILE.USER.id },
            post(){ return _.zipObject(this.fields,this.fields.map(key => this[key])) },
        },
        methods: {
            submit(){ this.disabled = true; this.$post('company','create',this.post).then(this.submitted); },
            submitted(data){ this.disabled = false; this.$emit('response',data) }
        },
        created() {
            if(this.$attrs['user']){ this.client_input = false; this.user = this.$attrs.user; }
            if(!_.size(this.option_clients)) this.$post('client','fetch');
        }
    }
</script>
