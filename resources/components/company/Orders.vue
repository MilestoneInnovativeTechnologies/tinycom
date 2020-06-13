<template>
    <b-row class="mt-3">
        <b-col cols="12" class="d-flex justify-content-between align-items-center mb-3">
            <h5>Unpaid Orders</h5>
            <b-button squared variant="info" @click.prevent="$bvModal.show('manual-order-modal')"><b-icon icon="plus-square"></b-icon> Add Manual Order</b-button>
        </b-col>
        <b-col cols="8">
            <orders-list :orders="unpaid_orders" :busy="busy" :actions="['email','sms','pay','cancel']"></orders-list>
        </b-col>
        <b-col cols="4">
            <b-card header="New Order">
                <order-form :key="'orders-new-order-order-seq-' + seq" @submitted="newOrder" @busy="busy = true"></order-form>
            </b-card>
        </b-col>
        <b-modal title="New Order (Manual)" id="manual-order-modal" hide-footer><order-form @submitted="newOrder" manual="true"></order-form> </b-modal>
    </b-row>
</template>

<script>
    export default {
        name: "Orders",
        data(){ return {
            seq: 0, busy: false
        } },
        computed: {
            unpaid_orders(){ return _.filter(this.$store.state.ORDERS.DATA,['status','New']) },
            paid_orders(){ return _.filter(this.$store.state.ORDERS.DATA,['status','Paid']) },
        },
        methods: {
            newOrder(order){ this.seq++; this.busy = false; this.$bvModal.hide('manual-order-modal'); }
        },
        created() {
            this.$post('order','fetch');
        }
    }
</script>