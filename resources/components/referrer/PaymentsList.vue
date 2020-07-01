<template>
    <b-table :items="payments" :fields="fields.concat(actions ? 'actions' : [])" :per-page="per_page" :current-page="current_page">
        <template v-slot:cell(#)="data">{{ data.index + 1 }}</template>
        <template v-slot:cell(date)="data">{{ data.item.date | date }}</template>
        <template v-slot:cell(description)="data">{{ data.item.attributes.description }}</template>
        <template v-slot:cell(receipt)="data"><b-link v-if="data.item.status === 'Paid'" target="_blank" :href="ord_receipt(data.item)"><b-icon icon="reply"></b-icon></b-link><span v-else>NA</span></template>
        <template v-slot:cell(actions)="data" v-if="actions">
            <b-button v-if="actions.includes('sms') && data.item.status === 'New'" :disabled="disabled" @click.prevent="actionSMS(data.item)" size="sm" variant="outline-warning">Notify by SMS</b-button>
            <b-button v-if="actions.includes('email') && data.item.status === 'New'" :disabled="disabled" @click.prevent="" size="sm" variant="outline-warning">Notify by Email</b-button>
        </template>
    </b-table>
</template>

<script>
    export default {
        name: "PaymentsList",
        props: ['payments','fields','per_page','current_page','actions'],
        data(){ return { disabled:false } },
        computed: {
            payment(){ return this.$store.getters['PAYMENTS/order'] }
        },
        methods: {
            ord_receipt(order){ return _.get(this.payment,[order.id,'attachment'],_.get(order,'link')) },
            actionSMS({ id }){ this.disabled = true; this.$post('order','notify',{ id,medium:'sms' }).then(() => this.disabled = false) },
            actionEmail({ id }){ this.disabled = true; this.$post('order','notify',{ id,medium:'email' }).then(() => this.disabled = false) },
        }
    }
</script>
