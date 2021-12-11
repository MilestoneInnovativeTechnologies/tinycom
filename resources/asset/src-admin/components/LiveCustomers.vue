<template>
    <section class="live-customers">
        <RecordList title="Live Customers" :records="customers" :layout="layout" route="customer" row_key="id" empty="No live Customers" />
    </section>
</template>

<script>
    import RecordList from "components/RecordList";
    export default {
        name: "LiveCustomers",
      components: {RecordList},
      data(){ return {
          layout: [{ name:'name',label:'Customer',field:'name',align:'left' },{ name:'updated',label:'Last Update',field:'updated',align:'left' }]
        } },
        computed: {
            customers(){ return _.map(this.$store.getters["CUSTOMERS/live"],customer => Object.assign({},customer,{ updated:fromNow(customer.live)})) },
        }
    }
</script>
