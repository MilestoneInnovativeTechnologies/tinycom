<template>
  <q-markup-table dense class="text-left">
    <thead><tr><th>ID</th><th>Name</th><th>Description</th><th>Status</th><th>Image</th></tr></thead>
    <tbody><CategoryUpdateRow v-for="(category,id) in categories" :key="['form','update','category',id].join('-')" v-bind="category" /></tbody>
  </q-markup-table>
</template>

<script>
import CategoryUpdateRow from "components/CategoryUpdateRow";
export default {
  name: "CategoryUpdateTable",
  props: ['filter'],
  components: {CategoryUpdateRow},
  computed: {
    categories(){ return this.filter ? this.filtered(this.filter.toString().toLowerCase()) : _.values(this.$store.state.CATEGORIES.CATEGORIES) }
  },
  methods: {
    filtered(text){ return _.filter(this.$store.state.CATEGORIES.CATEGORIES,({ name,description }) => _.includes([name,description].join(' ').toLowerCase(),text)) }
  }
}
</script>
