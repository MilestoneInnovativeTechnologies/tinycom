<template>
  <q-card style="width: 65vw">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Add new Address</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="q-gutter-xs">
      <q-input dense outlined v-model.lazy="input.title" label="Title" type="text" />
      <q-input dense outlined v-model.lazy="input.address" label="Address" type="textarea" style="height: 5rem" />
      <q-input dense outlined v-model.lazy="input.location" label="Location" type="text" />
    </q-card-section>
    <q-card-actions align="right" class="q-px-md">
      <q-btn label="Add Address" color="primary" :loading="loading" @click="create" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "ProfileAddressNew",
  data(){ return {
    loading: false,
    input: { title: '', address: '', location: '' }
  } },
  methods: {
    create(){
      this.loading = true;
      if(!this.input.address || !this.input.title) return this.loading = false;
      this.$store.dispatch('USER/address',this.input)
        .then(() => {
          this.loading = false;
          this.input.title = this.input.address = this.input.location = '';
          this.$emit('created')
        })
    }
  }
}
</script>
