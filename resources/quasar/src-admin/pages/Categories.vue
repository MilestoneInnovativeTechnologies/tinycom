<template>
  <q-page padding>
    <SearchAndAction v-model="filter" @new="create = true" />
    <CategoryUpdateTable class="q-mt-sm" :filter="filter" />
    <q-dialog v-model="create" persistent>
      <CreateCategoryCard @created="create = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import CategoryUpdateTable from "components/CategoryUpdateTable";
import CreateCategoryCard from "components/CreateCategoryCard";
import SearchAndAction from "components/SearchAndAction";
export default {
  name: "PageCategories",
  components: {SearchAndAction, CreateCategoryCard, CategoryUpdateTable},
  data(){ return { filter:'', create: false } },
}
</script>
