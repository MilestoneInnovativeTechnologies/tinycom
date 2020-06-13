<template>
    <b-card header="Current Subscription" no-body v-if="current">
        <b-list-group flush>
            <b-list-group-item>Edition<span class="float-right">{{ edition }}</span></b-list-group-item>
            <b-list-group-item>Expire On<span class="float-right">{{ current.end | date }}</span></b-list-group-item>
            <b-list-group-item>Started On<span class="float-right">{{ current.start | date }}</span></b-list-group-item>
            <b-list-group-item v-if="current.order">
                <b-button v-if="payment" block variant="outline-info" @click.prevent="showPayment"><b-icon icon="box-arrow-up-right" class="mr-2"></b-icon>Payment Details</b-button>
                <new-subscription-order-setup v-if="!upcoming" :company="company" class="mt-2"></new-subscription-order-setup>
            </b-list-group-item>
        </b-list-group>
        <order-payment-details-modal :id="current.order" :state="showModal" @state="showModal = $event"></order-payment-details-modal>
    </b-card>
</template>

<script>
    import { CardPlugin,ListGroupPlugin,IconsPlugin,ButtonPlugin } from 'bootstrap-vue'
    Vue.use(CardPlugin); Vue.use(ListGroupPlugin); Vue.use(IconsPlugin); Vue.use(ButtonPlugin);

    export default {
        name: "CompanyCurrentSubscription",
        props: ['company'],
        data(){ return { showModal:false } },
        computed: {
            subscriptions(){ return _.get(this.$store.getters["SUBSCRIPTIONS/companies"],this.company) },
            current(){ return _(this.subscriptions).filter(['status','Current']).maxBy(({ end }) => new Date(end).getTime()) },
            upcoming(){ return _(this.subscriptions).filter(['status','Upcoming']).minBy(({ start }) => new Date(start).getTime()) },
            edition(){ return _.get(_.keyBy(this.$store.state.EDITIONS.DATA,'id'),[this.current.edition,'name'],'') },
            payment() { return _.get(this.$store.getters["PAYMENTS/order"],this.current.order,'') }
        },
        methods: {
            showPayment(){ this.showModal = true }
        }
    }
</script>