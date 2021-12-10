<template>
  <q-page padding>
    <q-input outlined v-model="filter" dense placeholder="Search.."><template v-slot:prepend><q-icon name="search" /></template></q-input>
    <ItemList v-if="filter" :items="filter_items" title="Search Results" />
    <div v-else>
      <ItemList more="exclusive" class="q-mt-xs" title="Exclusive Items" :items="exclusive" v-if="exclusive.length" :limit="exclusive_nos" />
      <ItemList class="q-mt-xs" title="Latest Items" :items="latest_items" v-if="latest_items.length" :limit="latest" />
      <CategoriesList class="q-mt-xs" v-if="categories.length > 1" />
      <ItemList class="q-mt-xs" :items="other_items" :limit="categories.length > 1 ? 8 : other_items.length" />
    </div>
  </q-page>
</template>

<script>
import ItemList from "./../components/ItemList";
import CategoriesList from "./../components/CategoriesList";
export default {
  name: 'PageIndex',
  components: {CategoriesList, ItemList},
  data(){ return { filter: '',exclusive_nos:8,latest:8 } },
  computed: {
    filter_items(){ return this.filter ? _(this.slugs).map((v,k) => _.includes(v,_.toLower(this.filter)) ? _.toInteger(k) : null).filter().value() : [] },
    items(){ return _(this.$store.getters["ITEMS/all"]).keys().map(_.toInteger).value() },
    exclusive(){ return _(this.$store.state.SOURCE.SOURCE.items).keys().map(_.toInteger).intersection(this.items).value() },
    latest_items(){ return _.difference(_.map(this.$store.getters["ITEMS/getLatest"](),_.toInteger) || [],this.exclusive.slice(0,this.exclusive_nos)) },
    other_items(){ return _.difference(this.items,this.exclusive.slice(0,this.exclusive_nos),this.latest_items.slice(0,this.latest)) },
    slugs(){ return this.$store.getters["ITEMS/slugs"] },
    categories(){ return _.keys(this.$store.state.CATEGORIES.CATEGORIES) },
  }

}
</script>
