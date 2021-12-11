<template>
  <q-item clickable v-ripple>
    <q-item-section>
      <q-item-label class="text-bold">{{ title }}</q-item-label>
      <q-item-label caption v-html="address" />
      <q-item-label v-if="location" caption v-html="location" />
    </q-item-section>
    <q-item-section side>
      <q-btn rounded dense size="sm" class="q-px-sm q-py-xs" color="grey-2" text-color="primary" icon="edit" @click="$emit('updating')" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "UpdateAddressItem",
  props: ['id','customer'],
  data(){ return {
    loading: false
  } },
  computed: {
    title: {
      get(){ return this.$attrs.title },
      set(title){ return this.$store.commit('USER/address',{ id:this.id,title }) },
    },
    address: {
      get(){ return (this.$attrs.address || '').toString().replace("\n","<br />") },
      set(address){ return this.$store.commit('USER/address',{ id:this.id,address }) },
    },
    location: {
      get(){ return this.$attrs.location },
      set(location){ return this.$store.commit('USER/address',{ id:this.id,location }) },
    }
  },
  methods: {
    doUpdate(){
      this.loading = true;
      this.$store.dispatch('USER/address',{ id:this.id,title:this.title,address:this.address,location:this.location },{ root:true })
        .then(() =>  this.loading = false)
    }
  }
}
</script>
