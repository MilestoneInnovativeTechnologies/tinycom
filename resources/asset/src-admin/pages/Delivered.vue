<template>
  <q-page padding>
    <DeliveredOrders limit="15" source="delivered" />
  </q-page>
</template>

<script>
import DeliveredOrders from "components/DeliveredOrders";
export default {
  name: "PageDelivered",
  components: {DeliveredOrders},
}
</script>
