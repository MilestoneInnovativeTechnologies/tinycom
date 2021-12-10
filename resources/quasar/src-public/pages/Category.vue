<template>
  <q-page padding>
    <q-btn padding="sm md" size="sm" dense class="q-mb-sm" color="warning" :to="{ name:'home' }"><q-icon name="reply_all" left />Browse all</q-btn>
    <ItemList :items="display" :limit="limit" />
  </q-page>
</template>

<script>
import ItemList from "../components/ItemList";
export default {
  name: 'PageCategory',
  components: {ItemList},
  data(){ return { filter: '', limit:40 } },
  props: ['id'],
  computed: {
    category(){ return this.$store.state.CATEGORIES.CATEGORIES[this.id] },
    items(){ return this.$store.getters["CATEGORIES/items"](this.id) },
    slugs(){ return _.pick(this.$store.getters["ITEMS/slugs"],this.items) },
    result(){ return _(this.slugs).map((v,k) => _.includes(v,_.toLower(this.filter)) ? _.toInteger(k) : null).filter().value() },
    display(){ return _.intersection(this.items,this.result) }
  }
}
</script>
