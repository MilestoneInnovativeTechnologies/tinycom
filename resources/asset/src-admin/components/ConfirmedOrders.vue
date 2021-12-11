<template>
  <RecordList :records="carts" :layout="layout" title="Confirmed Orders" route="bill" :empty="empty" :back="source" :limit="limit || 5" :row_key="row_key" />
</template>

<script>
  import RecordList from "components/RecordList";
  export default {
    name: "ConfirmedOrders",
    components: {RecordList},
    props: ['limit','source'],
    data() {
      return {
        layout: [
          {name: 'id', label: 'ID', field: 'id', align: 'left'},
          {name: 'customer', label: 'Customer', field: 'customer_name', align: 'left'},
          {name: 'total', label: 'Amount', field: 'total'},
        ],
        empty: "No any confirmed orders!!",
        row_key: 'id'
      }
    },
    computed: {
      carts() {
        return _(this.$store.getters["CARTS/all"]).filter(['status', 'Confirmed']).sortBy(({time}) => _.toInteger(time)).reverse().value()
      },
    }
  }
</script>
