<template>
  <q-card bordered flat :class="{ delivered }">
    <q-card-section><div class="text-h6 text-center">{{ COMPANY }}</div></q-card-section>
    <q-list dense padding bordered>
      <q-item v-for="(key,head) in layout" :key="['bill','head',key].join('-')">
        <q-item-section>{{ head }}</q-item-section>
        <q-item-section side class="text-black">{{ dBill[key] }}</q-item-section>
      </q-item>
    </q-list>
    <q-markup-table class="bg-transparent text-left">
      <thead><q-tr><q-th>#</q-th><q-th class="text-left">Item</q-th><q-th>Rate</q-th><q-th>Qty</q-th><q-th>Total</q-th></q-tr></thead>
      <tbody><q-tr v-for="(item,idx) in bill.items" :key="['bill','detail','item',idx].join('-')">
        <q-td>{{ idx+1 }}</q-td><q-td class="text-left">{{ itemName(item.item) }}</q-td><q-td class="text-right">{{ item.price }}</q-td><q-td>{{ item.quantity }}</q-td><q-td class="text-right">{{ item.amount }}</q-td>
      </q-tr></tbody>
    </q-markup-table>
    <q-separator />
    <q-card-section class="text-center">
      <div class="text-h5 text-weight-bolder">{{ bill.total }}</div>
      <p v-if="delivered && bill.amount != bill.total" class="text-center" style="font-size: 0.8rem">Paid {{ bill.amount }}/-</p>
    </q-card-section>
  </q-card>
</template>

<script>
const { extractDate,formatDate } = require('quasar').date
export default {
  name: "BillDetailCard",
  props: ['id'],
  data(){ return {
    COMPANY,
    layout: { 'Bill #':'id',Date:'confirmed_date',Time:'confirmed_time',Customer:'customer_name',Phone:'customer_phone' }
  } },
  computed: {
    bill(){ return this.$store.getters['CARTS/cart'](this.id) },
    date(){ return extractDate(this.bill.confirmed_at,'YYYY-MM-DD HH:mm:ss') },
    dBill(){ return _.assign({},this.bill,{ confirmed_date:formatDate(this.date,'DD/MMM/YYYY'), confirmed_time:formatDate(this.date,'hh:mm A') }) },
    delivered(){ return this.bill.status === 'Delivered' },
    address(){ return _.get(this.$store.getters["CUSTOMERS/address"],[this.bill.address,'address']) }
  },
  methods: {
    itemName(id){ return _.get(this.$store.state.ITEMS.ITEMS,[id,'name'],id) }
  }
}
</script>

<style scoped>
  .delivered {
    background: url("../assets/delivered.png") bottom right no-repeat;
  }
</style>
