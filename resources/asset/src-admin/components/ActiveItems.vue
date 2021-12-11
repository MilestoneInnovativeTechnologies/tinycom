<template>
  <q-markup-table dense>
    <thead class="text-left"><tr><th>ID</th><th>Status</th><th>Name</th><th>Description</th><th>&nbsp;</th></tr></thead>
    <tbody><ItemUpdateRow v-for="(item,idx) in items" :key="['active','item','update','row',idx].join('-')" v-bind="item" /></tbody>
  </q-markup-table>
</template>

<script>
import ItemUpdateRow from "components/ItemUpdateRow";
export default {
  name: "ActiveItems",
  components: {ItemUpdateRow},
  props: ['filter'],
  computed: {
    items(){ return _(this.$store.getters["ITEMS/all"]).filter(({ status }) => status === 'Y').filter(({ name,description }) => _.isEmpty(this.filter) || _.includes(_.toLower(name+description),_.toLower(this.filter))).value() },
  }
}
</script>
