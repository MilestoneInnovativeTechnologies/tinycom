<template>
  <q-markup-table dense class="text-left">
    <thead><tr><th>Price</th><th>Selling</th><th>Stock</th></tr></thead>
    <tbody><template v-for="item in items">
      <q-tr><q-th colspan="3">{{ item.name }}</q-th></q-tr>
      <StockUpdateRow v-bind="item" />
    </template></tbody>
  </q-markup-table>
</template>

<script>
import StockUpdateRow from "components/StockUpdateRow";
export default {
  name: "StockUpdateTable",
  components: {StockUpdateRow},
  props: ['filter'],
  computed: {
    items(){ return this.filter ? this.filtered(this.filter.toString().toLowerCase()) : _.values(this.$store.state.ITEMS.ITEMS) }
  },
  methods: {
    filtered(text){ return _.filter(this.$store.state.ITEMS.ITEMS,({ name,description }) => _.includes([name,description].join(' ').toLowerCase(),text)) }
  }
}
</script>
