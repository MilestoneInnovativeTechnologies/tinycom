<template>
  <q-card v-if="!delivered">
    <q-card-actions class="q-px-md">
      <q-btn push class="full-width" color="primary" label="Mark as Delivered" :loading="loading" @click="deliver(null)" />
    </q-card-actions>
    <q-dialog v-model="prompt" persistent>
      <q-card>
        <q-card-section><div class="text-h6">Collection</div></q-card-section>
        <q-card-section class="q-pt-none"><q-input dense v-model="collection" autofocus /></q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn :loading="loading" flat label="Submit" v-close-popup @click="deliver(collection)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import formData from "assets/formData";

export default {
  name: "BillActionCard",
  props: ['id'],
  data(){ return {
    loading: false,
    prompt: false, collection: 0,
  } },
  computed: {
    bill(){ return this.$store.getters['CARTS/cart'](this.id) },
    delivered(){ return this.bill.status === 'Delivered' }
  },
  methods: {
    deliver(collection){
      this.prompt = false; this.collection = this.bill.total;
      if(collection === null) return this.prompt = true;
      this.loading = true;
      this.$store.dispatch('CARTS/delivered',formData.obj({ id:this.bill.id,amount:collection })).then(() => this.loading = this.prompt = false)
    }
  }
}
</script>
