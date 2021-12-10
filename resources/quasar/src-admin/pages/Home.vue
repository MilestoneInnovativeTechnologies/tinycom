<template>
  <q-page padding>
    <PendingOrders limit="5" />
    <OrdersMetric class="q-mt-sm" />
    <Sources class="q-mt-sm" />
    <LiveMetric class="q-mt-sm" />
    <LiveCustomers class="q-mt-sm" />
    <LiveCarts class="q-mt-sm" />
  </q-page>
</template>

<script>
    import PendingOrders from "components/PendingOrders";
    import OrdersMetric from "components/OrdersMetric";
    import Sources from "components/Sources";
    import LiveMetric from "components/LiveMetric";
    import LiveCustomers from "components/LiveCustomers";
    import LiveCarts from "components/LiveCarts";
    export default {
      name: "PageHome",
      components: {LiveCarts, LiveCustomers, LiveMetric, Sources, PendingOrders,OrdersMetric},
    }
</script>
