<template>
    <b-card :title="company.company" img-src="https://i.ibb.co/BqD2r7h/company-profile.jpg" img-top>
        <b-list-group>
            <b-list-group-item>Domain <span class="float-right">{{ company.domain }}</span></b-list-group-item>
            <b-list-group-item>Since <span class="float-right">{{ company.created_at | date }}</span></b-list-group-item>
            <b-list-group-item>Unpaid Orders <b-badge class="float-right p-2" variant="warning">{{ unpaid.length }}</b-badge></b-list-group-item>
        </b-list-group>
    </b-card>
</template>

<script>
    import { CardPlugin,ListGroupPlugin,BadgePlugin } from 'bootstrap-vue'
    Vue.use(CardPlugin); Vue.use(ListGroupPlugin); Vue.use(BadgePlugin);

    export default {
        name: "CompanyInfoCard",
        props: ['company'],
        computed: {
            orders(){ return this.$store.getters["ORDERS/companies"][this.company.id] },
            unpaid(){ return _.filter(this.orders,['status','New']) },
        }
    }
</script>