<template>
  <q-page padding>
    <q-input outlined v-model="filter" dense placeholder="Search.."><template v-slot:prepend><q-icon name="search" /></template></q-input>
    <ItemList class="q-mt-xs" :items="items" v-if="exclusive.length" :limit="exclusive.length" />
    <q-btn class="q-mt-xs full-width" color="primary" :label="(exclusive.length ? '' : 'NO ANY EXCLUSIVE ITEMS FOUND, ') + 'SHOP ALL'" :to="{ name:'home' }" icon="reply_all" />
  </q-page>
</template>

<script>
import ItemList from "./../components/ItemList";
export default {
  name: 'PageExclusive',
  components: {ItemList},
  data(){ return { filter: '' } },
  computed: {
    exclusive(){ return _.keys(this.$store.state.SOURCE.SOURCE.items) },
    slugs(){ return _.pick(this.$store.getters["ITEMS/slugs"],this.exclusive) },
    filter_items(){ return this.filter ? _(this.slugs).map((v,k) => _.includes(v,_.toLower(this.filter)) ? k : null).filter().value() : this.exclusive },
    items(){ return _.intersection(this.filter_items,this.exclusive) }
  }

}
</script>
