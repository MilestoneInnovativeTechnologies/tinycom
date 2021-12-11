<template>
  <RecordList :records="carts" :layout="layout" route="bill" :empty="empty" :limit="limit || 20" :back="source" :row_key="row_key" />
</template>

<script>
  import RecordList from "components/RecordList";
  export default {
    name: "DeliveredOrders",
    components: {RecordList},
    props: ['limit','source'],
    data() {
      return {
        layout: [
          {name: 'id', label: 'ID', field: 'id', align: 'left'},
          {name: 'customer', label: 'Customer', field: 'customer_name', align: 'left'},
          {name: 'total', label: 'Amount', field: 'amount'},
        ],
        empty: "No any orders delivered!!",
        row_key: 'id'
      }
    },
    computed: {
      carts(){ return _(this.$store.getters["CARTS/all"]).filter(['status','Delivered']).sortBy(({ time }) => _.toInteger(time)).reverse().value() },
    }
  }
</script>
