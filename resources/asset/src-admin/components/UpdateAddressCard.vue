<template>
  <div>
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">Address</div><q-space />
        <q-btn icon="add" color="primary" round @click="form = !form"/>
      </q-card-section>
      <q-list separator>
        <UpdateAddressItem v-for="address in addresses" :key="'update-address-' + address.id" v-bind="address" @updating="updating(address.id)" />
      </q-list>
    </q-card>
    <q-dialog persistent v-model="form" full-width @before-hide="done">
      <AddressFormCard :customer="id" :id="update" @done="done" />
    </q-dialog>
  </div>
</template>

<script>
import UpdateAddressItem from "components/UpdateAddressItem";
import AddressFormCard from "components/AddressFormCard";
export default {
  name: "UpdateAddressCard",
  components: {AddressFormCard, UpdateAddressItem},
  props: ['id'],
  data(){ return {
    form: false, update: null
  } },
  computed: {
    addresses(){ return this.$store.getters['CUSTOMERS/addresses'][this.id] }
  },
  methods: {
    updating(id){ this.update = id; this.form = true },
    done(){ this.update = null; this.form = false },
  }
}
</script>
