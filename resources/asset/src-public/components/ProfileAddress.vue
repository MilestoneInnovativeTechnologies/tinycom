<template>
  <q-list separator>
    <q-item-label header>Address</q-item-label>
    <ProfileAddressItem v-for="address in addresses" :key="'profile-address-' + address.id" v-bind="address" @updating="$emit('updating',$event)" />
  </q-list>
</template>

<script>
import ProfileAddressItem from "components/ProfileAddressItem";
export default {
  name: "ProfileAddress",
  components: {ProfileAddressItem},
  computed: {
    addresses(){ return this.$store.getters['USER/ADDRESS'] }
  }
}
</script>
