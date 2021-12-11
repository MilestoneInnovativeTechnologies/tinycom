<template>
  <q-page padding>
    <BillDetailCard :id="id" style="max-width: 55vh" class="q-mx-auto"  />
    <BillShareCard :id="id" style="max-width: 55vh" class="q-mt-sm q-mx-auto" />
    <BillActionCard :id="id" style="max-width: 55vh" class="q-mt-sm q-mx-auto" />
    <BackButton right style="max-width: 55vh" class="q-mx-auto q-mt-sm" v-if="hasBack" :to="backRoute" />
  </q-page>
</template>

<script>
import BillDetailCard from "components/BillDetailCard";
import BillShareCard from "components/BillShareCard";
import BillActionCard from "components/BillActionCard";
import {backRoute} from "src/mixins/back";
export default {
  name: "PageBill",
  components: {BillActionCard, BillShareCard, BillDetailCard},
  mixins: [backRoute],
  props: ['id']
}
</script>
