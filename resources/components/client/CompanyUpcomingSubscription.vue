<template>
    <b-card header="Upcoming Subscription" no-body v-if="upcoming">
        <b-list-group flush>
            <b-list-group-item>Edition<span class="float-right">{{ edition }}</span></b-list-group-item>
            <b-list-group-item>Expire On<span class="float-right">{{ upcoming.end | date }}</span></b-list-group-item>
            <b-list-group-item>Started On<span class="float-right">{{ upcoming.start | date }}</span></b-list-group-item>
            <b-list-group-item v-if="upcoming.order && payment">
                <b-button block variant="outline-info" @click.prevent="showPayment"><b-icon icon="box-arrow-up-right" class="mr-2"></b-icon>Payment Details</b-button>
            </b-list-group-item>
        </b-list-group>
        <order-payment-details-modal :id="upcoming.order" :state="showModal" @state="showModal = $event"></order-payment-details-modal>
    </b-card>
</template>

<script>
    import { CardPlugin,ListGroupPlugin,IconsPlugin,ButtonPlugin } from 'bootstrap-vue'
    Vue.use(CardPlugin); Vue.use(ListGroupPlugin); Vue.use(ButtonPlugin); Vue.use(IconsPlugin);

    export default {
        name: "CompanyUpcomingSubscription",
        props: ['company'],
        data(){ return { showModal:false } },
        computed: {
            subscriptions(){ return _.get(this.$store.getters["SUBSCRIPTIONS/companies"],this.company) },
            upcoming(){ return _(this.subscriptions).filter(['status','Upcoming']).minBy(({ start }) => new Date(start).getTime()) },
            edition(){ return _.get(_.keyBy(this.$store.state.EDITIONS.DATA,'id'),[this.upcoming.edition,'name'],'') },
            payment() { return _.get(this.$store.getters["PAYMENTS/order"],this.upcoming.order,null) }
        },
        methods: {
            showPayment(){ this.showModal = true }
        }
    }
</script>