<template>
  <q-page padding>
    <PendingOrders limit="15" source="orders" />
  </q-page>
</template>

<script>
import PendingOrders from "components/PendingOrders";
export default {
  name: "PageOrders",
  components: {PendingOrders},
}
</script>
