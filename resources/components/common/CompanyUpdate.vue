<template>
    <b-container>
        <b-form-group label-cols="3" label-align="right" label="Company Name"><b-form-input v-model="company" required></b-form-input></b-form-group>
        <b-form-group label-cols="3" label-align="right" label="Domain" v-if="details.setup === 'N'">
            <b-input-group>
                <b-form-input v-model="sub" required></b-form-input>
                <b-input-group-append>
                    <b-form-select v-model="host" required :options="$store.state.COMPANIES.DOMAINS"></b-form-select>
                </b-input-group-append>
            </b-input-group>
        </b-form-group>
        <b-button class="offset-3" variant="outline-info" :disabled="disabled" @click.prevent="update"><b-spinner small v-show="disabled" class="mb-1 mr-2"></b-spinner>Update</b-button>
    </b-container>
</template>

<script>
    export default {
        name: "CompanyUpdate",
        props: ['id'],
        data(){ return {
            disabled: false,
            company: '', sub: '', host: '',
            fields: ['id','company','domain','sub'],
        } },
        computed: {
            details(){ return _.find(this.$store.state.COMPANIES.DATA,['id',this.id]) },
            domain: {
                get(){ return [this.sub,this.host].join('.') },
                set(d){ let { domain,sub } = this.$store.getters['COMPANIES/dParts'](d); this.host = domain; this.sub = sub; },
            },
            post(){ return _.zipObject(this.fields,this.fields.map(key => this[key])) },
        },
        methods: {
            update(){ this.disabled = true; this.$post('company','update',this.post).then(this.submitted); },
            submitted(data){ this.disabled = false; this.$emit('update',data) }
        },
        mounted() {
            this.company = this.details.company;
            this.domain = this.details.domain;
        }
    }
</script>