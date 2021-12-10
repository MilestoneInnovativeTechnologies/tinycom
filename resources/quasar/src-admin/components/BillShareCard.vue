<template>
  <q-card v-if="bill">
    <q-card-section class="q-pb-none">
      <q-input type="textarea" outlined dense style="height: 4rem" :value="url" label="Sharable Link" />
    </q-card-section>
    <q-card-actions class="q-px-md q-gutter-sm">
      <q-btn type="a" push color="primary" label="Share via WhatsApp" :href="whatsapp" target="_blank" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "BillShareCard",
  props: ['id'],
  data(){ return {
  } },
  computed: {
    bill(){ return this.$store.getters['CARTS/cart'](this.id) },
    url(){ return urlParse('BILL_LINK',{ uuid:this.bill.uuid }) },
    whatsapp(){ return urlParse('WHATSAPP',{ phone:'91'+this.bill.customer_phone,text:this.url }) },
    delivered(){ return this.bill.status === 'Delivered' }
  },
  methods: {
    itemName(id){ return _.get(_.head(_.filter(this.$store.state.ITEMS.ITEMS,['id',id])),'name') }
  }
}
</script>
