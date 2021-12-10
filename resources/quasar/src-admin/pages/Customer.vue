<template>
  <q-page padding>
    <UpdateCustomerCard :id="id" />
    <UpdateAddressCard :id="id" class="q-mt-sm" />
    <CustomerGroupsCard :id="id" class="q-mt-sm" />
    <BackButton right class="q-mt-sm" v-if="hasBack" :to="backRoute" />
  </q-page>
</template>

<script>
import UpdateCustomerCard from "components/UpdateCustomerCard";
import {backRoute} from "src/mixins/back";
import UpdateAddressCard from "components/UpdateAddressCard";
import CustomerGroupsCard from "components/CustomerGroupsCard";
export default {
  name: "PageCustomer",
  components: {CustomerGroupsCard, UpdateAddressCard, UpdateCustomerCard},
  props: ['id'],
  mixins: [backRoute]
}
</script>
