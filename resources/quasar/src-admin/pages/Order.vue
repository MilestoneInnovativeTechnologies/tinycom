<template>
  <q-page padding>
<!--    <div style="clear: both" class="text-right q-mb-md"><q-btn label="BACK" icon="reply_all" size="sm" @click="$router.back()" /></div>-->
    <CartDetailCard :id="id" style="max-width: 55vh" class="q-mx-auto" />
    <OrderShareCard :id="id" style="max-width: 55vh" class="q-mx-auto q-mt-sm" />
    <OrderActionCard :id="id" style="max-width: 55vh" class="q-mx-auto q-mt-sm"  />
    <BackButton right style="max-width: 55vh" class="q-mx-auto q-mt-sm" v-if="hasBack" :to="backRoute" />
  </q-page>
</template>

<script>
import CartDetailCard from "components/CartDetailCard";
import OrderActionCard from "components/OrderActionCard";
import {backRoute} from "src/mixins/back";
import OrderShareCard from "components/OrderShareCard";
export default {
  name: "PageCart",
  components: {OrderShareCard, OrderActionCard, CartDetailCard},
  mixins: [backRoute],
  props: ['id'],
}
</script>
