<template>
  <q-card-section class="q-gutter-xs">
    <template>
      <q-select v-if="Object.keys(addresses).length > 1" label="Select Address" v-model="address" outlined :options="Object.values(addresses)" emit-value map-options option-label="address" option-value="id" />
      <div v-else>
        <div class="text-bold">Delivery Address</div>
        <q-btn v-if="Object.keys(addresses).length === 0 || !address || !addresses[address] || !addresses[address].address" type="a" label="No address found, Add New" padding="sm xs" flat text-color="primary" style="text-decoration: underline" :to="{ name:'profile' }" />
        <span v-else-if="addresses[address] && addresses[address].address">{{ addresses[address].address }}</span>
        <q-btn v-else type="a" label="Add New Address" padding="sm xs" flat text-color="primary" style="text-decoration: underline" :to="{ name:'profile' }" />
      </div>
    </template>
    <q-input type="textarea" label="Order note (if any)" v-model.lazy="note" outlined style="height: 5rem" class="q-mt-md" />
  </q-card-section>
</template>

<script>
export default {
  name: "CartExtraSection",
  computed: {
    note: {
      get(){ return this.$store.state.CART.note },
      set(note){ this.$store.commit('CART/extra',{ note },{ root:true }) }
    },
    address: {
      get(){ return _.toSafeInteger(this.$store.state.CART.address || _.findKey(this.addresses,['default','Y']) || Object.keys(this.addresses)[0]) },
      set(address){ this.$store.commit('CART/extra',{ address },{ root:true }) }
    },
    addresses(){
      return this.$store.getters['USER/ADDRESS'] || {}
    }
  },
  created() {
    if(this.address && this.addresses[this.address] && this.addresses[this.address].address)
      this.$store.commit('CART/extra',{ address:this.address },{ root:true })
  }
}
</script>
