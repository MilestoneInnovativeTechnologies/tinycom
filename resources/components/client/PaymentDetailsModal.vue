<template>
    <b-modal v-model="state" title="Payment Details" id="payment-details-modal" hide-footer v-if="payment && payment.order">
        <b-table :items="[payment]" stacked :fields="['date','type','detail','amount','receipt']" borderless>
            <template v-slot:cell(date)="data">{{ data.item.date | date }}</template>
            <template v-slot:cell(type)="data">{{ lg(order,'type') }}</template>
            <template v-slot:cell(detail)="data">{{ lg(order,['attributes','description']) }}</template>
            <template v-slot:cell(receipt)="data"><payment-receipt text="View" :id="id"></payment-receipt></template>
        </b-table>
    </b-modal>
</template>

<script>
    import { TablePlugin,ModalPlugin } from 'bootstrap-vue'
    Vue.use(TablePlugin); Vue.use(ModalPlugin);

    export default {
        name: "PaymentDetailsModal",
        props: ['id'],
        computed: {
            payment(){ return _.find(this.$store.state.PAYMENTS.DATA,['id',this.id]) },
            order(){ return _.find(this.$store.state.ORDERS.DATA,['id',this.payment.order]) },
            lg(){ return _.get },
            state: {
                get(){ return this.$attrs.state || false },
                set(state){ this.$emit('state',state) }
            }
        }
    }
</script>
