<template>
    <a v-if="order && order.payment" :href="link" target="_blank"><b-icon icon="reply" class="mr-1"></b-icon> {{ text }}</a>
</template>

<script>
    export default {
        name: "OrderReceipt",
        props: ['id','text'],
        computed: {
            order(){ return _.find(this.$store.state.ORDERS.DATA,['id',this.id]) },
            payment(){ return _.find(this.$store.state.PAYMENTS.DATA,['id',this.order.payment]) },
            link(){ return this.payment.attachment || this.order.link || '' },
        }
    }
</script>
