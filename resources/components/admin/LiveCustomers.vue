<template>
    <section class="live-customers">
        <RecordList title="Live Customers" :records="records" :layout="layout" />
    </section>
</template>

<script>
    export default {
        name: "LiveCustomers",
        data(){ return {
            layout: { Customer:'name','Last Update':'last_updated' }
        } },
        computed: {
            customers(){ return this.$store.getters["DASHBOARD/live_customers"] },
            records(){ return _(this.customers).sortBy('time').reverse().value() }
        }
    }
</script>

<style scoped>

</style>