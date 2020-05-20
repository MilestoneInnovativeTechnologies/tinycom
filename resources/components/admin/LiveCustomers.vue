<template>
    <section class="live-customers">
        <RecordList title="Live Customers" :records="customers" :layout="layout" />
    </section>
</template>

<script>
    export default {
        name: "LiveCustomers",
        data(){ return {
            layout: { Customer:'name','Last Update':'updated' }
        } },
        computed: {
            customers(){ return _.map(this.$store.getters["CUSTOMERS/live"],customer => Object.assign({},customer,{ updated:fromNow(customer.live)})) },
        }
    }
</script>