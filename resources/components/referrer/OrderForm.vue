<template>
    <b-container>
        <b-form-group label-cols="3" label-align="right" v-if="show_company" label="Company"><b-form-select v-model="company" required :options="option_companies"></b-form-select></b-form-group>
        <b-form-group label-cols="3" label-align="right" label="Edition"><b-form-select v-model="edition" required :options="option_editions"></b-form-select></b-form-group>
        <b-form-group label-cols="3" label-align="right" label="Tenure">
            <b-input-group>
                <b-form-input type="number" v-model="period" required></b-form-input>
                <b-input-group-append>
                    <b-form-select v-model="unit" required :options="option_tenures"></b-form-select>
                </b-input-group-append>
            </b-input-group>
        </b-form-group>
        <b-form-group label-cols="3" label-align="right" label="Amount"><b-form-input type="number" v-model="amount" readonly required></b-form-input></b-form-group>
        <b-form-group label-cols="3" label-align="right" label="Start Date"><b-form-input v-model="start" readonly required placeholder="yyyy-mm-dd"></b-form-input></b-form-group>
        <b-form-group label-cols="3" label-align="right" label="End Date"><b-form-input v-model="end" readonly placeholder="yyyy-mm-dd"></b-form-input></b-form-group>
        <b-form-group label-cols="3" label-align="right" label="Description"><b-form-textarea v-model="description" readonly></b-form-textarea></b-form-group>
        <b-button variant="info" @click.prevent="submit" class=" offset-3" :disabled="disabled" :calculate="calculate">SUBMIT</b-button>
    </b-container>
</template>

<script>
    export default {
        name: "OrderForm",
        data(){ return {
            show_company: true, fields: ['company','type','edition','amount','period','unit','name','email','contact','start','end','item','description'],
            company: null, type: 'Subscription', edition: null, period: null, unit: null, start: null, end: null, amount: 0, description: null,
            disabled: false,
        } },
        computed: {
            option_companies(){ return _.map(this.$store.state.COMPANIES.DATA,({ id,company }) => _.zipObject(['value','text'],[id,company])) },
            option_editions(){ return _(this.$store.state.EDITIONS.DATA).filter(['active','Y']).map(({ id,name }) => _.zipObject(['value','text'],[id,name])).value() },
            option_tenures(){ return _.keys(TENURES) },

            company_details(){ return this.company ? this.next(_.find(this.$store.state.COMPANIES.DATA,['id',this.company])) : {} },
            company_user(){ return this.company ? _.find(this.$store.state.CLIENTS.CLIENTS,['id',_.get(this.company_details,'user')]) : {} },

            name(){ return _.get(this.company_user,'name') },
            email(){ return _.get(this.company_user,'email') },
            contact(){ return _.get(this.company_user,'phone') },

            item(){ return APP + ' ' + this.type +  ' ' + this.period + ' ' + this.unit },

            calculate(){
                let edition = this.edition, period = this.period, unit = this.unit, start = this.start;
                if(edition && period && unit) this.$post('subscription','calc',{ start,period,unit,edition }).then(d => _.forEach(d,(v,k) => Vue.set(this,k,v)));
                this.description = [APP,'('+this.editionName(this.edition)+') - New',this.type,'for',this.company_details.company].concat(this.type === 'Subscription' ? ['for the period of',this.period,this.unit,'starting from',this.start] : []).join(' ')
            }
        },
        methods: {
            editionName(id){ return id ? _.get(_.keyBy(this.option_editions,'value'),[id,'text']) : '' },
            next(data){ this.$post('subscription','next',{ company:data.id }).then(next => this.start = next); return data; },
            submit(){
                this.disabled = true;
                let post = _.zipObject(this.fields,_.map(this.fields.map(field => this[field] || '')))
                this.$post('order','create',post).then(response => this.$emit('created',response,this.disabled = false))
            }
        },
        created() {
            if(this.$attrs.company) { this.show_company = false; this.company = this.$attrs.company; this.next({ id:this.company }) }
        },

    }
</script>
