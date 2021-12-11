<template>
  <q-page padding>
    <SearchAndAction action="back" v-model="filter" @back="$router.push({ name:'items' })" />
    <div v-if="!filter" class="row fit no-wrap items-center content-start q-mt-sm">
      <div class="text-bold col-grow text-right">Update every item stock to </div>
      <div class="q-mx-sm"><q-input type="number" dense outlined v-model="stock" style="width: 4rem" /></div>
      <div><q-btn label="Update" @click="common" color="primary" dense class="q-px-sm" push /></div>
    </div>
    <StockUpdateTable :filter="filter" class="q-mt-sm" />
  </q-page>
</template>

<script>
import SearchAndAction from "components/SearchAndAction";
import StockUpdateTable from "components/StockUpdateTable";
export default {
  name: "PageStock",
  components: {StockUpdateTable, SearchAndAction},
  data(){ return {
    filter: '', stock: 0,
  } },
  methods: {
    common(){ this.$store.dispatch('ITEMS/stock',this.stock) }
  }
}
</script>
