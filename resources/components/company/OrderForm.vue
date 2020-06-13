<template>
    <b-container>
        <b-modal :title="'Active Subscriptions - ' + companyDetails.company" :id="'active_subscriptions_'+unique"><subscriptions-list :subscriptions="active_subscriptions" empty_text="No any subscriptions found!!"></subscriptions-list></b-modal>
        <b-form-group label-cols="3" label-align="right" v-if="show_company" label="Company"><b-form-select v-model="company" required :options="option_companies"></b-form-select></b-form-group>
        <b-form-group label-cols="3" label-align="right" label="Type"><b-form-select v-model="type" required :options="['Subscription','Addon','Other']"></b-form-select></b-form-group>
        <div v-if="company && type === 'Subscription'" class="text-right mb-3"><a href="#" @click.prevent="$bvModal.show('active_subscriptions_'+unique)" class="text-right">View Active Subscriptions</a></div>
        <b-form-group v-if="type !== 'Subscription'" label-cols="3" label-align="right" label="Amount"><b-form-input type="number" v-model="amount" required></b-form-input></b-form-group>
        <div v-else>
            <b-form-group label-cols="3" label-align="right" label="Edition"><b-form-select v-model="edition" required :options="option_editions"></b-form-select></b-form-group>
            <b-form-group label-cols="3" label-align="right" label="Tenure">
                <b-input-group>
                    <b-form-input type="number" v-model="period" required></b-form-input>
                    <b-input-group-append>
                        <b-form-select v-model="unit" required :options="option_tenures"></b-form-select>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
            <b-form-group label-cols="3" label-align="right" label="Amount"><b-form-input type="number" v-model="amount" required></b-form-input></b-form-group>
            <b-form-group label-cols="3" label-align="right" label="Start Date"><b-form-input v-model="start" required placeholder="yyyy-mm-dd"></b-form-input></b-form-group>
            <b-form-group label-cols="3" label-align="right" label="End Date"><b-form-input v-model="end" readonly placeholder="yyyy-mm-dd"></b-form-input></b-form-group>
        </div>
        <div v-if="manual">
            <b-form-group label-cols="3" label-align="right" label="Reference"><b-form-input v-model="reference" required placeholder="Invoice No"></b-form-input></b-form-group>
            <b-form-group label-cols="3" label-align="right" label="Payment Link"><b-form-input v-model="link" placeholder="https://abc.de/f/GhiJkLm"></b-form-input></b-form-group>
        </div>
        <b-form-textarea v-model="note"></b-form-textarea>
        <b-button block variant="info" @click.prevent="submit" class="mt-3">SUBMIT</b-button>
    </b-container>
</template>

<script>
    export default {
        name: "OrderForm",
        props: ['manual'],
        data(){ return {
            option_tenures: _.keys(TENURES), show_company: true, unique:0,
            fields: ['company','type','edition','amount','period','unit','name','email','contact','start','end','item','description','reference','link'],
            company: null, type: null, edition: null, amount: null, period: null, unit: null, start: null, end: null, description: '',
            reference: null, link: null,
            next: {},
        } },
        computed: {
            companyDetails(){ return this.company ? _.get(this.$store.state.COMPANIES.DATA,_.get(this.$store.getters["COMPANIES/index"],this.company),{}) : {} },
            customerDetails(){ return this.company ? _.get(this.$store.state.CLIENTS.CLIENTS,_.get(this.$store.getters["CLIENTS/index"],this.companyDetails.user),{}) : {} },
            subscriptions(){ return this.company ? _.get(this.$store.getters["SUBSCRIPTIONS/companies"],this.companyDetails.id,[]) : [] },
            active_subscriptions(){ return _.filter(this.subscriptions,['active','Y']); },
            customer_id(){},
            name(){ return _.get(this.customerDetails,'name','') },
            email(){ return _.get(this.customerDetails,'email','') },
            contact(){ return _.get(this.customerDetails,'phone','') },
            option_companies(){ return _.map(this.$store.state.COMPANIES.DATA,({ id,company }) => _.zipObject(['value','text'],[id,company])) },
            option_editions(){ return _(this.$store.state.EDITIONS.DATA).filter(['active','Y']).map(({ id,name }) => _.zipObject(['value','text'],[id,name])).value() },
            note: {
                get(){ return [APP,'- New',this.type,'for',this.companyDetails.company].concat(this.type === 'Subscription' ? ['for the period of',this.period,this.unit,'starting from',this.start] : []).join(' ') },
                set(note){ this.description = note }
            },
            item(){ return APP + ' ' + this.type + (this.type === 'Subscription' ? (' ' + this.period + ' ' + this.unit) : '') },
            post(){ return _.zipObject(this.fields,this.fields.map(field => this[field])) }
        },
        methods: {
            submit(){ this.description = this.note; this.$post('order','create',this.post).then(order => this.$emit('submitted',order)) }
        },
        created() {
            this.unique = Math.random();
            if(!_.size(this.option_companies)) this.$post('company','fetch');
            if(!_.size(this.$store.state.CLIENTS.CLIENTS)) this.$post('client','fetch');
            if(!_.size(this.option_editions)) this.$post('edition','fetch');
            if(this.$attrs.company) { this.company = this.$attrs.company; this.show_company = false }
        },
        watch: {
            company(company){
                if(!company) return;
                if(!this.subscriptions.length) this.$post('subscription','fetch',{ company });
                if(!_.has(this.next,company)) this.$post('subscription','next',{ company }).then(d => this.next = Object.assign({},this.next,_.set({},company,d)))
                else this.start = _.get(this.next,company);
            },
            next: {
                deep: true,
                handler(){ this.start = _.get(this.next,this.company); }
            },
            period(period){ if(!period || !this.start || !this.unit || !this.edition) return; this.$post('subscription','calc',{ start:this.start,period,unit:this.unit,edition:this.edition }).then(data => _.forEach(data,(val,key) => this[key] = val)) },
            unit(unit){ if(!this.period || !this.start || !unit || !this.edition) return; this.$post('subscription','calc',{ start:this.start,period:this.period,unit,edition:this.edition }).then(data => _.forEach(data,(val,key) => this[key] = val)) },
            start(start){ if(!this.period || !start || !this.unit || !this.edition) return; this.$post('subscription','calc',{ start,period:this.period,unit:this.unit,edition:this.edition }).then(data => _.forEach(data,(val,key) => this[key] = val)) },
            edition(edition){ if(!this.period || !start || !this.unit || !edition) return; this.$post('subscription','calc',{ start,period:this.period,unit:this.unit,edition }).then(data => _.forEach(data,(val,key) => this[key] = val)) },
        }

    }
</script>