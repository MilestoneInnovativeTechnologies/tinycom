<template>
  <q-page padding>
    <div style="clear: both" class="text-right q-mb-md"><q-btn label="BACK" icon="reply_all" size="sm" :to="{ name:'home' }" /></div>
    <CartDetailCard :id="id" style="max-width: 55vh" class="q-mx-auto" live="true" />
  </q-page>
</template>

<script>
import CartDetailCard from "components/CartDetailCard";
export default {
  name: "PageLive",
  components: {CartDetailCard},
  props: ['id']
}
</script>
