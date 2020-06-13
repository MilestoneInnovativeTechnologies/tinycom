<template>
    <subscription-company-list :items="expired" :filter="filter" :fields="['no','company_name','domain','expired']" :actions="['mail_expired','subscriptions','unpaid_orders','add_order']"></subscription-company-list>
</template>

<script>
    import {COMPANIES} from "../../js/mixins/companies";

    export default {
        name: "Expired",
        mixins: [COMPANIES],
        props: ['filter'],
    }
</script>