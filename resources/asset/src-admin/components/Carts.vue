<template>
  <RecordList :records="carts" :layout="layout" title="" route="cart" :empty="empty" :back="source" :limit="limit || 15" row_key="id" />
</template>

<script>
import RecordList from "components/RecordList";

export default {
  name: "Carts",
  components: {RecordList},
  props: ['limit','source'],
  data() {
    return {
      layout: [
        {name: 'id', label: 'ID', field: 'id', align: 'left'},
        {name: 'customer', label: 'Customer', field: 'customer_name', align: 'left'},
        {name: 'status', label: 'Status', field: 'status'},
        {name: 'updated', label: 'Updated', field: 'updated'},
        {name: 'source', label: 'Source', field: 'source_title'},
      ],
      empty: "No any carts right now..",
      row_key: 'id'
    }
  },
  computed: {
    carts() {
      return _(this.$store.getters["CARTS/all"]).sortBy(({updated_at}) => new Date(updated_at).getTime()).reverse().value()
    },
  }
}
</script>

