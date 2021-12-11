<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted(){
    _.forEach(['CARTS','CUSTOMERS','ITEMS','SOURCES'],module => this.$store.dispatch(`${module}/init`).then(null))
    setTimeout(($vm) => $vm.$store.dispatch('CARTS/orders').then(null),10000,this);
  }
}
</script>
