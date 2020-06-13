<template>
    <b-card header="Previous Orders (Paid)" v-if="paid.length">
        <b-table :items="paid" small :fields="['description','amount','receipt']">
            <template v-slot:cell(description)="data">{{ data.item.attributes.description }}</template>
            <template v-slot:cell(receipt)="data"><order-receipt :id="data.item.id"></order-receipt></template>
        </b-table>
    </b-card>
</template>

<script>
    import { CardPlugin,TablePlugin } from 'bootstrap-vue'
    Vue.use(CardPlugin); Vue.use(TablePlugin);

    export default {
        name: "CompanyPreviousPaymentsCard",
        props: ['company'],
        computed: {
            orders(){ return _.get(this.$store.getters["ORDERS/companies"],this.company) },
            paid(){ return _.filter(this.orders,['status','Paid']) }
        }
    }
</script>
