<template>
  <q-card class="bg-grey-1">
    <q-card-section><div class="text-center text-bold">TODAY</div></q-card-section>
    <q-card-section horizontal class="q-gutter-xs q-px-xs row text-center">
      <q-card-section class="bg-white col q-pa-lg"><div class="text-weight-bold" style="font-size: 1.15rem">{{ carts.length || 0 }}</div><div>ORDER</div></q-card-section>
      <q-card-section class="bg-white col q-pa-lg"><div class="text-weight-bold" style="font-size: 1.15rem">{{ confirmed || 0 }}</div><div>CONFIRM</div></q-card-section>
      <q-card-section class="bg-white col q-pa-lg"><div class="text-weight-bold" style="font-size: 1.15rem">{{ delivered || 0 }}</div><div>DELIVER</div></q-card-section>
    </q-card-section>
    <q-card-section><div class="text-center text-bold">COLLECTION: {{ total }}</div></q-card-section>
  </q-card>
</template>

<script>
    export default {
        name: "OrdersMetric",
        data(){ return {
            consider: ['Ordered','Confirmed','Delivered'],
            today: new Date().getDate()
        } },
        computed: {
            carts(){ return _.filter(this.$store.getters["CARTS/all"],({ status,updated_at }) => new Date(updated_at).getDate() === this.today && _.includes(this.consider,status)) },
            group(){ return _.groupBy(this.carts,'status') },
            delivered(){ return _.get(this.group,'Delivered',[]).length; },
            confirmed(){ return _.get(this.group,'Confirmed',[]).length + this.delivered; },
            total(){ return _.sumBy(_.get(this.group,'Delivered',[{ amount:0 }]),({ amount }) => _.toNumber(amount)) }
        }
    }
</script>
