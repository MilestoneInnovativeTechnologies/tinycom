<template>
    <subscription-company-list :items="expiring" :filter="filter" :fields="['no','company_name','domain','expire']" :actions="['mail_expiring','subscriptions','unpaid_orders','add_order']"></subscription-company-list>
</template>

<script>
    import {COMPANIES} from "../../js/mixins/companies";

    export default {
        name: "Expiring",
        props: ['filter'],
        mixins: [COMPANIES],
    }
</script>