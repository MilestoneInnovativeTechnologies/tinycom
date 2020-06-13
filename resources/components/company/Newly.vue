<template>
    <div>
        <b-table :items="newly" :fields="fields" small>
            <template v-slot:cell(no)="data">{{ data.index+1 }}</template>
            <template v-slot:cell(actions)="data">
                <b-button size="sm" :disabled="disabled" variant="warning" @click.prevent="mailSetupCompleted(data.item.id)"><b-icon icon="envelope"></b-icon> Send Setup Complete Mail</b-button>
                <b-button size="sm" variant="info" @click.prevent="addReferrer(data.item.id)"><b-icon icon="envelope"></b-icon> Set Referrer</b-button>
            </template>
        </b-table>
        <b-modal id="new-companies-set-referrer" title="Select Referrer" size="sm" hide-footer><b-form-select :options="option_referrers" v-model="referrer"></b-form-select><b-button @click="setReferrer" class="mt-2" block variant="primary">Set Referrer</b-button></b-modal>
    </div>
</template>

<script>
    import {COMPANIES} from "../../js/mixins/companies";

    export default {
        name: "Newly",
        mixins: [COMPANIES],
        data(){ return {
            company: null, disabled: false, referrer: null,
            fields: ['no', { key:'company',label:'Name' },'domain',{ key:'created_at',label:'Added On',formatter:'dateFilter' },{ key:'user',label:'Client',formatter:'clientName' },{ key:'referrer',formatter:'referrerName' },'actions'],
        } },
        computed: {
            clients(){ return _(this.$store.state.CLIENTS.CLIENTS).keyBy('id').value() },
            referrers(){ return _(this.$store.state.REFERRERS.DATA).keyBy('id').value() },
            option_referrers(){ return _(this.referrers).mapValues('name').map((text,value) => { return { text,value } }).value() }
        },
        methods: {
            dateFilter(value){ return this.$options.filters.date(value) },
            viewInstruction(company){
                this.company = company;
                this.$bvModal.show('company-setup-instructions-modal')
            },
            clientName(id){ return _.get(this.clients,[id,'name'],'') },
            referrerName(id){ return _.get(this.referrers,[id,'name'],'') },
            mailSetupCompleted(id){ this.disabled = true; this.sendSetupInfoMail(id).then(() => this.disabled = false); },
            addReferrer(company){ this.company = company; return this.$bvModal.show('new-companies-set-referrer') },
            setReferrer(){ this.disabled = true; this.changeReferrer(this.company,this.referrer).then(() => this.$bvModal.hide((this.disabled = false) || 'new-companies-set-referrer')) },
        },
        created() {
            if(!this.$store.state.CLIENTS.CLIENTS.length) this.$post('client','fetch');
            if(!this.$store.state.REFERRERS.DATA.length) this.$post('referrer','fetch');
        }
    }
</script>