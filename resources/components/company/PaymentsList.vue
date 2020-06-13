<template>
    <section>
        <b-table :items="payments" :fields="fields" small :per-page="per_page" :current-page="current_page">
            <template v-slot:cell(#)="data">{{ data.index+1 }}</template>
            <template v-slot:cell(receipt)="data"><a :href="data.item.attachment || (orders[data.item.order] ? orders[data.item.order].link : data.item.order)" target="_blank"><b-icon size="sm" icon="box-arrow-in-up-right"></b-icon> View</a></template>
            <template v-slot:cell(type)="data">{{ orders[data.item.order] ? orders[data.item.order].type : data.item.order }}</template>
            <template v-slot:cell(actions)="data">
                <b-button variant="info" size="sm" @click="viewDetail(data.item)"><b-icon icon="arrow-up-left"></b-icon> Details</b-button>
            </template>
        </b-table>
        <b-row v-if="payments.length > 22" class="my-2"><b-col cols="3" class="offset-4"><b-pagination v-model="current_page" :total-rows="payments.length" :per-page="per_page" align="fill" size="sm"></b-pagination></b-col></b-row>
        <b-modal title="Payment Details" id="payments-list-payment-details"><b-table stacked :items="items" small></b-table></b-modal>
    </section>
</template>

<script>
    export default {
        name: "PaymentsList",
        data(){ return {
            fields: ['#', { key:'date',label:'Date',formatter:'dateFilter' },{ label:'Company',key:'order',formatter:'companyName' },'type','amount','receipt','actions'],
            selected_order: null,
            per_page: 15, current_page: 1,
        } },
        computed: {
            payments(){ return this.$store.state.PAYMENTS.DATA },
            companies(){ return _(this.$store.state.COMPANIES.DATA).keyBy('id').mapValues('company').value() },
            orders(){ return _(this.$store.state.ORDERS.DATA).keyBy('id').value() },

            items(){ return this.selected_order ? [this.orders[this.selected_order]['attributes']] : [] },
        },
        methods: {
            dateFilter(date){ return this.$options.filters.date(date) },
            companyName(order){ return _.get(this.companies,_.get(this.orders,[order,'company'])) },

            viewDetail({ order }){ this.selected_order = order; this.$bvModal.show('payments-list-payment-details'); }
        },
        created() {
            if(!_.size(this.payments)) this.$post('payment','fetch');
            if(!_.size(this.companies)) this.$post('company','fetch');
            if(!_.size(this.orders)) this.$post('order','fetch');
        }
    }
</script>
