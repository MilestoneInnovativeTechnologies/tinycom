<template>
    <section class="live-customers">
        <RecordList title="Live Customers" :records="customers" :layout="layout" />
    </section>
</template>

<script>
    export default {
        name: "LiveCustomers",
        data(){ return {
            layout: { Customer:'name','Updated':'updated' }
        } },
        computed: {
            customers(){ return this.$store.getters["CUSTOMERS/live"] },
        }
    }
</script>