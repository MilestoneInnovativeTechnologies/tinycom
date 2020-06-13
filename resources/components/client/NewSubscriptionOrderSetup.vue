<template>
    <div>
        <b-button block variant="outline-primary" v-b-modal="id"><b-icon icon="box-arrow-up-right" class="mr-2"></b-icon>New Subscription Order</b-button>
        <b-modal :id="id" hide-footer>
            <b-form-group label-cols="3" label-align="right" v-if="showCompany" label="Company"><b-form-select v-model="post.company" required :options="option_companies"></b-form-select></b-form-group>
            <b-form-group label-cols="3" label-align="right" label="Edition"><b-form-select v-model="post.edition" required :options="option_editions"></b-form-select></b-form-group>
            <b-form-group label-cols="3" label-align="right" label="Tenure">
                <b-input-group>
                    <b-form-input type="number" v-model="post.period" required></b-form-input>
                    <b-input-group-append>
                        <b-form-select v-model="post.unit" required :options="option_tenures"></b-form-select>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
            <b-form-group label-cols="3" label-align="right" label="Amount"><b-form-input type="number" v-model="post.amount" required readonly></b-form-input></b-form-group>
            <b-form-group label-cols="3" label-align="right" label="Start Date"><b-form-input v-model="post.start" required placeholder="yyyy-mm-dd" readonly></b-form-input></b-form-group>
            <b-form-group label-cols="3" label-align="right" label="End Date"><b-form-input v-model="post.end" readonly placeholder="yyyy-mm-dd"></b-form-input></b-form-group>
            <b-form-textarea v-model="post.description" readonly></b-form-textarea>
            <b-button block variant="info" @click.prevent="submit" class="mt-3">SUBMIT</b-button>
        </b-modal>
    </div>
</template>

<script>
    import { ButtonPlugin,FormGroupPlugin,IconsPlugin,FormSelectPlugin,FormInputPlugin,InputGroupPlugin,FormTextareaPlugin,ToastPlugin } from 'bootstrap-vue'
    Vue.use(FormGroupPlugin); Vue.use(ButtonPlugin); Vue.use(IconsPlugin); Vue.use(FormSelectPlugin); Vue.use(FormInputPlugin); Vue.use(InputGroupPlugin); Vue.use(FormTextareaPlugin); Vue.use(ToastPlugin);

    export default {
        name: "NewSubscriptionOrderSetup",
        data(){ return {
            showCompany:true,
            fields: ['company','type','edition','amount','period','unit','name','email','contact','start','end','item','description','reference','link'],
            post: {
                company: null, type: 'Subscription', edition: null, period: null, unit: null, amount: null, start: null, end: null, description: null, reference: null, link: null
            }
        } },
        computed: {
            id(){ return 'new-subscription-order-modal-' + Math.random() },
            company(){ return this.post.company ? _.find(this.$store.state.COMPANIES.DATA,['id',this.post.company]) : {} },
            edition(){ return this.post.edition ? _.find(this.option_editions,['value',this.post.edition]).text : '' },
            option_companies(){ return _(this.$store.state.COMPANIES.DATA).map(({ id,company }) => _.zipObject(['text','value'],[company,id])).value() },
            option_editions(){ return _(this.$store.state.EDITIONS.DATA).map(({ id,name }) => _.zipObject(['text','value'],[name,id])).value() },
            option_tenures(){ return _.keys(TENURES) },

            item(){ return APP + ' ' + this.post.type + (this.post.type === 'Subscription' ? (' ' + this.post.period + ' ' + this.post.unit) : '') },
            name(){ return _.get(this.$store.state.PROFILE.USER,'name','') },
            email(){ return _.get(this.$store.state.PROFILE.USER,'email','') },
            contact(){ return _.get(this.$store.state.PROFILE.USER,'phone','') },
        },
        methods: {
            calculate({ edition,period,unit,start }){
                if(edition && period && unit) this.$post('subscription','calc',{ start,period,unit,edition }).then(d => _.forEach(d,(v,k) => Vue.set(this.post,k,v)));
                this.post.description = [APP,'('+this.edition+') - New',this.post.type,'for',this.company.company].concat(this.post.type === 'Subscription' ? ['for the period of',this.post.period,this.post.unit,'starting from',this.post.start] : []).join(' ')
            },
            next(){ this.$post('subscription','next',{ company:this.company }).then(next => this.post.start = next) },
            submit(){
                let post = _.zipObject(this.fields,_.map(this.fields.map(field => _.has(this.post,field) ? this.post[field] : (this[field] || ''))))
                this.$post('order','create',post).then(({ message,variant }) => this.$bvToast.toast(message,{ variant,modal:this.$bvModal.hide(this.id) }))
            }
        },
        created() {
            if(this.$attrs.company) { this.showCompany = false; this.post.company = this.$attrs.company; this.next() }
        },
        watch: {
            post: { deep:true, handler:'calculate' },
            company: 'next'
        }
    }
</script>
