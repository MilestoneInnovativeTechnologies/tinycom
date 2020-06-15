<template>
    <b-container class="mt-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5>Payments</h5>
            <b-button @click.prevent="$bvModal.show(modal)" squared variant="info"><b-icon icon="building" class="mr-1"></b-icon> Add</b-button>
        </div>
        <payments-list :payments="payments" :fields="['#','date','amount','description','status','receipt']" :per_page="per_page" :current_page="current_page"></payments-list>
        <b-pagination v-model="current_page" :total-rows="payments.length" :per-page="per_page" align="center" size="sm"></b-pagination>
        <b-modal :id="modal" hide-footer title="New Company"><order-form @created="response"></order-form></b-modal>
    </b-container>
</template>

<script>
    export default {
        name: "Payments",
        data(){ return {
            modal: 'payments-new-payment-modal-' + Math.random(),
            per_page: 30, current_page: 1
        } },
        computed: {
            payments(){ return _.filter(this.$store.state.ORDERS.DATA,({ status }) => ['New','Paid'].includes(status)) }
        },
        methods: {
            response({ message,variant }){ this.$bvModal.hide(this.modal); this.$bvToast.toast(message,{ title:'New Subscription Order',variant }) }
        }
    }
</script>