<template>
  <q-item clickable v-ripple @click="makeDefault">
    <q-item-section avatar><q-icon name="done_all" :color="color" /></q-item-section>
    <q-item-section v-if="update" class="q-gutter-xs">
      <q-input dense outlined v-model.lazy="title" label="Title" type="text" />
      <q-input dense outlined v-model.lazy="address" label="Address" type="textarea" style="height: 5rem" />
      <q-input dense outlined v-model.lazy="location" label="Location" type="text" />
    </q-item-section>
    <q-item-section v-else>
      <q-item-label style="text-transform: uppercase">{{ title }}</q-item-label>
      <q-item-label caption>{{ address }}</q-item-label>
      <q-item-label caption v-if="location">{{ location }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn v-if="update" rounded dense size="sm" class="q-px-sm q-py-xs" color="primary" :loading="loading" icon="save" @click="doUpdate" />
      <q-btn v-else rounded dense size="sm" class="q-px-sm q-py-xs" color="grey-2" text-color="primary" icon="edit" @click="update = true" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "ProfileAddressItem",
  props: ['id'],
  data(){ return {
    update: false, loading: false
  } },
  computed: {
    color(){ return this.default === 'Y' ? 'primary' : 'grey-4' },
    default: {
      get(){ return this.$attrs.default },
      set(def){ return this.$store.commit('USER/address',{ id:this.id,default:def }) },
    },
    title: {
      get(){ return this.$attrs.title },
      set(title){ return this.$store.commit('USER/address',{ id:this.id,title }) },
    },
    address: {
      get(){ return this.$attrs.address },
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
      .then(() => { this.loading = false; this.update = false })
    },
    makeDefault(){
      if(this.default === 'Y') return ;
      this.$store.dispatch('USER/address',{ id:this.id,default:'Y' },{ root:true })
    }
  },
  watch: {
    update(status){ this.$emit('updating',status) }
  }
}
</script>
