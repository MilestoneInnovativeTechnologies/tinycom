<template>
  <q-page padding>
    <ConfirmedOrders limit="15" source="confirmed" />
  </q-page>
</template>

<script>
import ConfirmedOrders from "components/ConfirmedOrders";
export default {
  name: "PageConfirmed",
  components: {ConfirmedOrders},
}
</script>
