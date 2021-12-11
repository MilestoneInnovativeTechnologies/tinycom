<template>
  <q-page padding>
    <SearchAndAction v-model="filter" @new="create = true" />
    <div class="text-right q-my-sm">
      <q-btn label="Stock &amp; Price update" color="light" text-color="primary" size="sm" :to="{ name:'stock' }" />
    </div>
    <div class="text-bold q-mt-md" style="clear: both">Active Items</div>
    <ActiveItems class="q-mt-sm" :filter="filter" />
    <div class="text-bold q-mt-md">Inactive Items</div>
    <InActiveItems class="q-mt-sm" :filter="filter" />
    <q-dialog v-model="create" persistent>
      <CreateItemCard @created="create = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import ActiveItems from "components/ActiveItems";
import InActiveItems from "components/InActiveItems";
import CreateItemCard from "components/CreateItemCard";
import SearchAndAction from "components/SearchAndAction";
export default {
  name: "PageItems",
  components: {SearchAndAction, CreateItemCard, InActiveItems, ActiveItems},
  data(){ return { filter:'', create: false } },
}
</script>
