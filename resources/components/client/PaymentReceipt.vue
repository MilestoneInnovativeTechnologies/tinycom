<template>
    <a v-if="payment && payment.order" :href="link" target="_blank"><b-icon icon="reply" class="mr-1"></b-icon> {{ text }}</a>
</template>

<script>
    import { IconsPlugin } from 'bootstrap-vue'
    Vue.use(IconsPlugin);

    export default {
        name: "PaymentReceipt",
        props: ['id','text'],
        computed: {
            payment(){ return _.find(this.$store.state.PAYMENTS.DATA,['id',this.id]) },
            order(){ return _.find(this.$store.state.ORDERS.DATA,['id',this.payment.order]) },
            link(){ return this.payment.attachment || this.order.link || '' },
        }
    }
</script>
