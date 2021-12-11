<template>
  <q-card class="bg-grey-1">
    <q-card-section><div class="text-center text-bold">LIVE</div></q-card-section>
    <q-card-section horizontal class="q-gutter-xs q-px-xs row text-center">
      <q-card-section class="bg-white col q-pa-lg"><div class="text-weight-bold" style="font-size: 1.15rem"><q-icon name="groups" class="q-mr-xs" size="sm" />{{ customers.length || 0 }}</div><div>CUSTOMERS</div></q-card-section>
      <q-card-section class="bg-white col q-pa-lg"><div class="text-weight-bold" style="font-size: 1.15rem"><q-icon name="insights" class="q-mr-xs" size="sm" />{{ cart_amount || 0 }}</div><div>TOTAL</div></q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
    export default {
        name: "LiveMetric",
        computed: {
            carts(){ return this.$store.getters["CARTS/live"] },
            customers(){ return this.$store.getters["CUSTOMERS/live"] },
            cart_amount(){ return _.sumBy(this.carts,({ total }) => _.toNumber(total)) }
        }
    }
</script>
