<template>
    <b-container class="mt-3" fluid>
        <div><h5>Hi, {{ $store.getters["PROFILE/name"] }}</h5></div>
        <b-row>
            <b-col cols="4">
                <b-card no-body>
                    <b-list-group flush>
                        <b-list-group-item v-if="pending.length"><metric-one text="SETUP PENDING" :count="pending.length" variant="warning" img="https://cdn4.iconfinder.com/data/icons/refresh_cl/256/Symbols/Warning.png"></metric-one></b-list-group-item>
                        <b-list-group-item><metric-one text="COMPANIES" :count="companies.length" variant="info" to="companies" img="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/office_building.png"></metric-one></b-list-group-item>
                        <b-list-group-item><metric-one text="CLIENTS" :count="clients.length" variant="info" to="clients" img="https://i.ibb.co/qJxbxhx/referrers.jpg"></metric-one></b-list-group-item>
                    </b-list-group>
                </b-card>
                <b-card class="mt-3" v-if="pending.length" header="Setup Pending Companies" no-body>
                    <b-list-group flush>
                        <b-list-group-item v-for="company in pending" :key="'pending-company-list-company-'+company.id" class="d-flex">
                            <detail title="company" icon="building">{{ company.company }}</detail>
                            <detail title="domain" icon="at" class="mx-auto">{{ company.domain }}</detail>
                            <detail title="client" icon="person">{{ clientName(company.user) }}</detail>
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
                <b-card class="mt-3" header="New Subscription Order">
                    <order-form @created="orderCreated" :key="'order-seq-'+order_seq"></order-form>
                </b-card>
            </b-col>
            <b-col cols="8">
                <b-row>
                    <b-col><metric-two text="PENDING ORDERS" variant="warning" color="white" icon="collection-play">{{ unpaid.length }}</metric-two></b-col>
                    <b-col><metric-two text="UNPAID ORDER VALUE" variant="info" color="white" icon="award">{{ unpaid_value }}</metric-two></b-col>
                    <b-col><metric-two text="TOTAL PAYMENTS" variant="success" color="white" icon="x-diamond-fill">{{ total }}</metric-two></b-col>
                </b-row>
                <b-card>
                    <b-card-title class="text-info">Subscriptions <b-badge variant="info" class="float-right p-2">{{ subscriptions.length }}</b-badge></b-card-title>
                    <dl class="row align-items-center text-info">
                        <dt class="col-3 my-2">Active</dt><dd class="col-9 mb-0"><b-progress :max="companies.length" striped :value="active.length" height="2rem" show-value variant="success"></b-progress></dd>
                        <dt class="col-3 my-2">Upcoming</dt><dd class="col-9 mb-0"><b-progress :max="companies.length" striped :value="upcoming.length" height="2rem" show-value variant="info"></b-progress></dd>
                        <dt class="col-3 my-2">Recently Expiring</dt><dd class="col-9 mb-0"><b-progress :max="companies.length" striped :value="expiring.length" height="2rem" show-value variant="primary"></b-progress></dd>
                        <dt class="col-3 my-2">Recently Expired</dt><dd class="col-9 mb-0"><b-progress :max="companies.length" striped :value="expired.length" height="2rem" show-value variant="warning"></b-progress></dd>
                        <dt class="col-3 my-2">Expired & Inactive</dt><dd class="col-9 mb-0"><b-progress :max="companies.length" striped :value="inactive.length" height="2rem" show-value variant="danger"></b-progress></dd>
                    </dl>
                </b-card>
                <referrer-payment-card class="mt-3" :id="$store.state.PROFILE.USER.id"></referrer-payment-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {COMPANIES} from "../../js/mixins/companies";
    import { BProgress } from "bootstrap-vue";

    export default {
        name: "Home",
        mixins: [COMPANIES],
        components: { BProgress },
        data(){ return { order_seq:0 }},
        computed: {
            clients(){ return this.$store.state.CLIENTS.CLIENTS },
            payments(){ return this.$store.state.PAYMENTS.DATA },

            unpaid(){ return _(this.orders).filter(['status','New']).value() },
            unpaid_value(){ return _.sumBy(this.unpaid,({ amount }) => _.toNumber(amount)) },
            total(){ return _.sumBy(this.payments,({ amount }) => _.toNumber(amount)) },
        },
        methods: {
            clientName(id){ return _.get(_.find(this.clients,['id',id]),'name','') },
            orderCreated({ message,variant,data }){
                this.$bvToast.toast(message,{ title:'New Subscription Order',variant })
                this.order_seq++;
            }
        }
    }
</script>