<template>
    <b-card header="Pending Payments" v-if="pending.length">
        <b-table :items="orders" small :fields="['description','amount','pay']">
            <template v-slot:cell(description)="data">{{ data.item.attributes.description }}</template>
            <template v-slot:cell(pay)="data"><a :href="data.item.link" target="_blank"><b-icon icon="reply" class="mr-1"></b-icon></a></template>
        </b-table>
    </b-card>
</template>

<script>
    import { CardPlugin,TablePlugin } from 'bootstrap-vue'
    Vue.use(CardPlugin); Vue.use(TablePlugin);

    export default {
        name: "CompanyPendingPaymentsCard",
        props: ['company'],
        computed: {
            orders(){ return _.get(this.$store.getters["ORDERS/companies"],this.company) },
            pending(){ return _.filter(this.orders,['status','New']) }
        }
    }
</script>
