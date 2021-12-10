<template>
  <RecordList :records="carts" :layout="layout" :empty="empty" route="order" :limit="limit || 5" :back="source" :row_key="row_key" />
</template>

<script>
  import RecordList from "components/RecordList";
  export default {
    name: "PendingOrders",
    components: {RecordList},
    props: ['limit','source'],
    data() {
      return {
        layout: [
          {name: 'id', label: 'ID', field: 'id', align: 'left'},
          {name: 'customer', label: 'Customer', field: 'customer_name', align: 'left'},
          {name: 'total', label: 'Total', field: 'total'},
        ],
        empty: "No any pending orders!!",
        row_key: 'id'
      }
    },
    computed: {
      carts() {
        return _(this.$store.getters["CARTS/all"]).filter(['status', 'Ordered']).sortBy(({time}) => _.toInteger(time)).reverse().value()
      },
    }
  }
</script>
