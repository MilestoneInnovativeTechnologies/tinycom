<template>
    <subscription-company-list :items="active" :filter="filter" :fields="['no','company_name','domain']" :actions="['view_details','subscriptions','unpaid_orders','add_order','change_referrer']"></subscription-company-list>
</template>

<script>
    import {COMPANIES} from "../../js/mixins/companies";

    export default {
        name: "Active",
        mixins: [COMPANIES],
        props: ['filter'],
    }
</script>