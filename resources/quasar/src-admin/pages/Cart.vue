<template>
  <q-page padding>
<!--    <div style="clear: both" class="text-right q-mb-md"><q-btn label="BACK" icon="reply_all" size="sm" @click="$router.back()" /></div>-->
    <CartDetailCard :id="id" style="max-width: 55vh" class="q-mx-auto" />
    <BackButton right style="max-width: 55vh" class="q-mx-auto q-mt-sm" v-if="hasBack" :to="backRoute" />
  </q-page>
</template>

<script>
import CartDetailCard from "components/CartDetailCard";
import {backRoute} from "src/mixins/back";
export default {
  name: "PageCart",
  components: {CartDetailCard},
  mixins: [backRoute],
  props: ['id'],
}
</script>
