<template>
    <b-card v-if="payments.length" header="Payments">
        <h4>Summary</h4>
        <b-table small :items="grouped_items" small></b-table>
        <h4>Detail</h4>
        <b-table small :items="payments" small :fields="['Year','Month','Description','Amount']">
            <template v-slot:cell(Year)="data">{{ new Date(data.item.date).getFullYear() }}</template>
            <template v-slot:cell(Month)="data">{{ Months[new Date(data.item.date).getMonth()] }}</template>
            <template v-slot:cell(Description)="data">{{ lg(orders,[data.item.order,'attributes','description']) }}</template>
            <template v-slot:cell(Amount)="data">{{ lg(data.item,['amount']) }}</template>
        </b-table>

    </b-card>
</template>

<script>
    export default {
        name: "ReferrerPaymentCard",
        props: ['id'],
        data(){ return {
            Months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            max: new Date().getTime() - (9*30*24*60*60*1000)
        } },
        computed: {
            lg(){ return _.get },
            companies(){ return _(this.$store.state.COMPANIES.DATA).filter(['referrer',this.id]).keyBy('id').mapValues('company').value() },
            c_keys(){ return _.map(this.companies,(c,k) => _.toInteger(k)) },
            orders(){ return _(this.$store.state.ORDERS.DATA).filter(({ company,status }) => status === 'Paid' && _.includes(this.c_keys,_.toInteger(company))).keyBy('id').value() },
            o_keys(){ return _.map(this.orders,(c,k) => _.toInteger(k)) },
            payments(){ return _(this.$store.state.PAYMENTS.DATA).filter(({ order,date }) => _.includes(this.o_keys,_.toInteger(order)) && new Date(date).getTime() > this.max).value() },
            grouped(){ return _.groupBy(this.payments,({ date }) => [new Date(date).getFullYear(),this.Months[new Date(date).getMonth()]].join('/')) },
            grouped_items(){ return _.map(this.grouped,(pays,date) => _.zipObject(['month','total'],[date,this.sumAmount(pays)]) )}
            // year_sum(){ return _.mapValues(this.year,(payments) => _.sumBy(payments,({ amount }) => _.toNumber(amount))) },
            // month(){ return _.mapValues(this.year,(payments) => _.groupBy(payments,({ date }) => new Date(date).getMonth())) },
            // month_sum(){ return _.mapValues(this.month,(mPayments) => _.mapValues(mPayments,(payments) => _.sumBy(payments,({ amount }) => _.toNumber(amount)))) }
        },
        methods: {
            sumAmount(pays){ return _.sumBy(pays,({ amount }) => _.toNumber(amount) )},
        },
        created() {
            if(!_.size(this.companies)) this.$post('company','fetch');
            if(!_.size(this.orders)) this.$post('order','fetch');
            if(!_.size(this.payments)) this.$post('payment','fetch');
        }
    }
</script>