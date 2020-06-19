<template>
    <section>
        <b-table :items="items" :filter="filter" :fields="p_fields" small :per-page="items.length > 22 ? 15 : 22" :current-page="current_page">
            <template v-slot:cell(no)="data">{{ data.index+1 }}</template>
            <template v-slot:cell(upcoming)="data">{{ upcoming(data.item.company).length ? 'Yes' : 'No'  }}</template>
            <template v-if="p_actions.length" v-slot:cell(actions)="data">
                <b-button v-for="(action,idx) in p_actions" :key="'sub-comp-list-actions-idx-'+idx" :disabled="disabled" :variant="action[1]" @click.prevent="exeAction(action[3],data.item)" size="sm" class="mr-1"><b-icon :icon="action[2]"></b-icon> {{ action[0] }} </b-button>
            </template>
        </b-table>
        <b-pagination v-if="items.length > 22" v-model="current_page" :total-rows="items.length" :per-page="15" align="center" size="sm"></b-pagination>
        <b-modal :id="'sub-comp-list-view-subscription-'+unique" title="Subscriptions"><subscriptions-list :subscriptions="selected_subscriptions"></subscriptions-list></b-modal>
        <b-modal :id="'sub-comp-list-add-subscription-'+unique" title="New Subscription Order" hide-footer><order-form :company="props.company" @created="orderCreated"></order-form></b-modal>
        <b-modal :id="'sub-comp-list-unpaid-orders-'+unique" title="Unpaid Orders"><orders-list :orders="unpaid_orders" :fields="['date','amount','link']" :actions="['email','pay']" empty_text="No any pending orders left"></orders-list></b-modal>
        <b-modal :id="'sub-comp-list-view-details-'+unique" title="Details" cancel-disabled><b-table :items="details" stacked borderless></b-table></b-modal>
        <b-modal :id="'sub-comp-list-update-name-'+unique" title="Update" hide-footer><company-update :id="props.company" @update="updated"></company-update></b-modal>
    </section>
</template>

<script>
    export default {
        name: "SubscriptionCompanyList",
        props: ['items','filter','fields','actions'],
        data(){ return {
            unique:0, disabled: false, current_page: 1,
            props: { company:null, manual:null, subscription:null },
            d_fields: {
                no: 'no',
                company_name: { key:'company',label:'Name',formatter:'cName',filterByFormatted:true },
                domain: { key:'domain',formatter:'cDomain',filterByFormatted:true },
                expire: { key:'end',label:'Expire On',formatter:'dateFilter' },
                expired: { key:'end',label:'Expired On',formatter:'dateFilter' },
                added: { key:'added_on',formatter:'cCreated',filterByFormatted:true },
                since: { key:'added_on',label:'Since',formatter:'cCreated',filterByFormatted:true },
                client: { key:'id',label:'Client',formatter:'cClient',filterByFormatted:true },
                edition: { key:'edition.name',label:'Edition',filterByFormatted:true },
            },
            d_actions: {
                mail_expiring: ['Send Mail','warning','envelope-open','mailExpiring'],
                mail_expired: ['Send Mail','warning','envelope-open-fill','mailExpired'],
                subscriptions: ['Subscriptions','info','arrow-down-up','viewSubscriptions'],
                view_details: ['Details','info','newspaper','viewDetail'],
                update_name: ['Update','info','pencil-square','updateName'],
                unpaid_orders: ['Unpaid Order','info','book-half','unpaidOrders'],
                add_order: ['Add Order','primary','box-seam','addOrder'],
            }
        } },
        computed: {
            per_page(){ return this.items.length > 22 ? 15 : this.items.length },
            p_fields(){ return this.fields ? _.map(this.fields,field => _.has(this.d_fields,field) ? this.d_fields[field] : field).concat(this.actions ? 'actions' : []) : ['no'] },
            p_actions(){ return this.actions ? _.map(this.actions,action => this.d_actions[action]) : [] },
            company_subscriptions(){ return this.$store.getters['SUBSCRIPTIONS/companies'] },
            selected_subscriptions(){ return _.get(this.company_subscriptions,this.props.company,[]) },
            company_orders(){ return this.$store.getters['ORDERS/companies'] },
            unpaid_orders(){ return this.props.company ? _.filter(_.get(this.company_orders,this.props.company,[]),['status','New']) : [] },
            clients(){ return _.keyBy(this.$store.state.CLIENTS.CLIENTS,'id'); },
            details(){
                let vm = this, cmp = this.props.company, sub = this.props.subscription, cp = _.bind(vm.companyProp,vm,cmp), ss = vm.selected_subscriptions, ca = [{},{},{ company:cmp }];
                return (cmp && sub) ? [ _.zipObject(
                    ['company','domain','client','added_on','expire_on'],
                    [cp('company'),cp('domain'),vm.cClient(...ca),vm.cCreated(...ca),vm.dateFilter(_.last(ss).end)]
                ) ] : [];
            }
        },
        methods: {
            dateFilter(value){ return this.$options.filters.date(value) },
            companyProp(id,prop){ return _.get(this.$store.state.COMPANIES.DATA,[_.get(this.$store.getters['COMPANIES/index'],id),prop]) },
            cName(id){ return this.companyProp(id,'company') },
            cDomain(value,key,row){ return this.companyProp(row.company,'domain') },
            cCreated(value,key,row){ return this.dateFilter(this.companyProp(row.company,'created_at')) },
            cClient(value,key,row){ return _.get(this.clients,[this.companyProp(row.company,'user'),'name']) },
            edition(value,key,row){ return value; _.get(_.find(this.$store.state.EDITIONS.DATA,['id',value]),'name'); },

            upcoming(company){ let subs = _.get(this.company_subscriptions,company); return _.filter(subs,['status','Upcoming']); },

            exeAction(method,item){ this.disabled = true; this[method](item) },
            viewSubscriptions({ company }){ this.props.company = company; this.$bvModal.show('sub-comp-list-view-subscription-'+this.unique); this.disabled = false; },
            viewDetail({ company,id }){ this.props.company = company; this.props.subscription = id; this.$bvModal.show('sub-comp-list-view-details-'+this.unique); this.disabled = false; },
            updateName({ company }){ this.props.company = company; this.$bvModal.show('sub-comp-list-update-name-'+this.unique); this.disabled = false; },
            updated({ message,variant }){ this.$bvModal.hide('sub-comp-list-update-name-'+this.unique); this.$bvToast.toast(message,{ title:'Company Name',variant }) },
            mailExpiring({ id }){ this.$post('subscription','sendExpiringMail',{ subscription:id }).then(({ message,variant }) => this.$bvToast.toast(message,{ variant,title:'Subscription Expiring',disabled:this.disabled = false })) },
            mailExpired({ id }){ this.$post('subscription','sendExpiredMail',{ subscription:id }).then(({ message,variant }) => this.$bvToast.toast(message,{ variant,title:'Subscription Expired',disabled:this.disabled = false })) },
            unpaidOrders({ company }){ this.props.company = company; this.$bvModal.show('sub-comp-list-unpaid-orders-'+this.unique); this.disabled = false; },
            addOrder({ company }){
                this.disabled = false; this.props.company = company;
                this.$bvModal.show('sub-comp-list-add-subscription-'+this.unique);
            },
            orderCreated({ message,variant }){ this.$bvModal.hide('sub-comp-list-add-subscription-'+this.unique); this.$bvToast.toast(message,{ title:'New Order',variant }) },
        },
        created() {
            this.unique = Math.random();
        }
    }
</script>
