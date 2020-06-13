<template>
    <b-row class="mt-3">
        <b-col cols="12" class="d-flex justify-content-between align-items-center mb-3">
            <h5>Recent Payments</h5>
            <div>
                <b-button squared variant="info" @click.prevent="$bvModal.show('payments-payment-modal')"><b-icon icon="plus-square"></b-icon> Add Payment</b-button>
                <b-button squared variant="info" @click.prevent="$post('payment','fetch')"><b-icon icon="box-arrow-in-down-left"></b-icon> Fetch Payments</b-button>
            </div>
        </b-col>
        <b-col cols="12">
            <payments-list></payments-list>
        </b-col>
        <b-modal title="New payment" id="payments-payment-modal" hide-footer><payment-form @submitted="newPayment"></payment-form></b-modal>
    </b-row>
</template>

<script>
    export default {
        name: "Payments",
        methods: {
            newPayment({ message,variant }){ this.$bvModal.hide('payments-payment-modal'); this.$bvToast.toast(message,{ title:'New Payment',variant }) }
        },
        created() {
            this.$post('payment','fetch');
        }
    }
</script>