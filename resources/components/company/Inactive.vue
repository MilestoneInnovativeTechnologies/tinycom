<template>
    <subscription-company-list :items="inactive" :filter="filter" :fields="['no','company_name','domain','added','expired']" :actions="['subscriptions','add_order']"></subscription-company-list>
</template>

<script>
    import {COMPANIES} from "../../js/mixins/companies";

    export default {
        name: "Inactive",
        mixins: [COMPANIES],
        props: ['filter'],
    }
</script>