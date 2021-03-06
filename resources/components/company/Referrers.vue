<template>
    <b-row class="mt-3">
        <b-col cols="3">
            <b-card no-body>
                <template slot="header">Referrers <b-button variant="info" class="float-right btn-sm" @click.prevent="referrerForm(selected = 0)"><b-icon icon="person-plus"></b-icon> Add</b-button></template>
                <b-list-group flush v-if="referrers.length">
                    <b-list-group-item v-if="referrers.length > 10"><b-form-input v-model="filter"></b-form-input></b-list-group-item>
                    <b-list-group-item v-for="referrer in referrers" :key="'referrers-list-referrer-' + referrer.id" v-if="filtered(referrer)">{{ referrer.name }}<a href="#" class="float-right" @click.prevent="selected = referrer.id"><b-icon icon="arrow-right-square"></b-icon></a></b-list-group-item>
                </b-list-group>
            </b-card>
        </b-col>
        <b-col cols="9">
            <b-card v-if="selected && referrer" :header="referrer.name">
                <div class="d-flex">
                    <detail class="mr-auto" v-for="(det,idx) in details" :key="'referrer-'+referrer.id+'-detail-'+idx" :title="det[0]" :icon="det[2]">{{ referrer[det[1]] }}</detail>
                    <detail class="mr-auto" title="Since" icon="clock-history">{{ referrer.created_at | date }}</detail>
                    <div class="d-flex align-self-start">
                        <b-button variant="info" class="ml-1" @click.prevent="referrerForm"><b-icon icon="pencil-square"></b-icon> Update</b-button>
                        <b-button variant="info" class="ml-1" @click.prevent="fetchCompanies" v-if="!companies_fetched"><b-icon icon="chevron-bar-down"></b-icon> Fetch Companies</b-button>
                    </div>
                </div>
            </b-card>
            <b-card class="mt-3" v-if="selected && referrer">
                <template slot="header"><span>Companies</span><b-button variant="info" class="float-right btn-sm" @click="companyForm"><b-icon icon="building"></b-icon> Add</b-button></template>
                <companies-list :companies="companies" :empty_text="companies_empty_text" :busy="busy" :actions="companies_actions" @showSubscriptions="showSubscriptions"></companies-list>
            </b-card>
            <referrer-payment-card class="mt-3" v-if='selected' :id="selected"></referrer-payment-card>
        </b-col>
        <b-modal id="referrer-form-modal" centered scrollable :title="(selected && referrers) ? 'Update Referrer' : 'Add new referrer'" hide-footer no-close-on-backdrop><referrer-form :referrer="referrer" @response="response"></referrer-form></b-modal>
        <b-modal id="referrer-company-form-modal" centered scrollable title="Add Referrer Company" hide-footer no-close-on-backdrop v-if="referrer"><company-form @response="companyResponse" :referrer="referrer.id"></company-form></b-modal>
        <b-modal id="subscriptions-modal" centered scrollable :title="company.company + ' Subscriptions'" hide-footer no-close-on-backdrop v-if="company">
            <subscriptions-list :subscriptions="subscriptions" :busy="busy"></subscriptions-list>
        </b-modal>
    </b-row>
</template>

<script>
    export default {
        name: "Referrers",
        data(){ return {
            item: 'referrer', selected: 0, filter: '', busy: false, company: null,
            details: [
                ['Name','name','person-bounding-box'],
                ['Email','email','at'],
                ['Phone','phone','tablet'],
            ]
        } },
        computed: {
            referrers(){ return this.$store.state.REFERRERS.DATA },
            referrer(){ return this.referrers[this.$store.getters["REFERRERS/index"][this.selected]] },
            filtered(){ return ({ name,email,phone }) => (!this.filter || [name,email,phone].join(' ').toLowerCase().includes(this.filter.toLowerCase())) },

            companies_fetched(){ return !!this.$store.state.COMPANIES.DATA.length },
            companies(){ return this.referrer ? _.get(this.$store.getters["REFERRERS/companies"],this.referrer.id,[]) : [] },
            companies_empty_text(){ return 'No companies, ' + (this.companies_fetched ? 'Start adding..' : 'Try Fetching..') },
            companies_actions(){ return [['showSubscriptions','View Subscriptions','info','soundwave']] },

            subscriptions(){ return this.company ? _.get(this.$store.getters["SUBSCRIPTIONS/companies"],this.company.id,[]) : [] }
        },
        methods: {
            setSelected(id){ Vue.set(this,'selected',id) },
            referrerForm(){ this.$bvModal.show('referrer-form-modal') },
            response({ variant,message }){
                this.$bvModal.hide('referrer-form-modal')
                this.$bvToast.toast(message,{ title:'Referrer',variant });
            },
            companyForm(){ if(!this.companies_fetched) this.$post('company','fetch',{ visible:1 }); this.$bvModal.show('referrer-company-form-modal') },
            fetchCompanies(){ this.busy = true; this.$post('company','fetch',{ visible:1 }).then(this.companyResponse) },
            companyResponse({ error,message,variant }){
                this.$bvToast.toast(error ? message : 'Companies fetched successfully!!',{ title:'Companies',variant });
                this.busy = false;
                this.$bvModal.hide('referrer-company-form-modal')
            },
            showSubscriptions(company,fetched){
                this.company = company;
                if(this.subscriptions.length || fetched) return this.$bvModal.show('subscriptions-modal')
                this.busy = true; this.$post('subscription','fetch',{ company:company.id }).then(() => { this.busy = false; this.showSubscriptions(company,true) })
            }
        },
        created(){
            this.$post(this.item,'fetch')
        },
    }
</script>
