<template>
    <b-modal v-model="state" title="Payment Details" id="order-payment-details-modal" hide-footer v-if="order && order.payment">
        <b-table :items="[payment]" stacked :fields="['date','type','detail','amount','receipt']" borderless>
            <template v-slot:cell(date)="data">{{ data.item.date | date }}</template>
            <template v-slot:cell(type)="data">{{ lg(order,'type') }}</template>
            <template v-slot:cell(detail)="data">{{ lg(order,['attributes','description']) }}</template>
            <template v-slot:cell(amount)="data">{{ lg(order,'amount') }}</template>
            <template v-slot:cell(receipt)="data"><payment-receipt text="View" :id="id"></payment-receipt></template>
        </b-table>
    </b-modal>
</template>

<script>
    import { TablePlugin,ModalPlugin } from 'bootstrap-vue'
    Vue.use(TablePlugin); Vue.use(ModalPlugin);

    export default {
        name: "OrderPaymentDetailsModal",
        props: ['id'],
        computed: {
            order(){ return _.find(this.$store.state.ORDERS.DATA,['id',this.id]) },
            payment(){ return _.find(this.$store.state.PAYMENTS.DATA,['id',this.order.payment]) },
            lg(){ return _.get },
            state: {
                get(){ return this.$attrs.state || false },
                set(state){ this.$emit('state',state) }
            }
        }
    }
</script>
