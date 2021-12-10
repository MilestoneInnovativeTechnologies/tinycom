<template>
  <q-page padding>
    <SearchAndAction v-model="filter" action="add" @add="create = true" />
    <Customers :filter="filter" class="q-mt-sm" source="customers" />
    <GroupsCard class="q-mt-sm" />
    <q-dialog v-model="create" persistent>
      <CreateCustomerCard @created="create = false" style="width: 90vw" />
    </q-dialog>
  </q-page>
</template>

<script>
import SearchAndAction from "components/SearchAndAction";
import Customers from "components/Customers";
import CreateCustomerCard from "components/CreateCustomerCard";
import GroupsCard from "components/GroupsCard";
export default {
  name: "PageCustomers",
  components: {GroupsCard, CreateCustomerCard, Customers, SearchAndAction},
  data(){ return {
    filter: '', create: false
  } }
}
</script>
