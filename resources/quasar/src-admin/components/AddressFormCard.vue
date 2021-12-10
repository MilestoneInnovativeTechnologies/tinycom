<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none"><div class="text-h6">Customer Address</div><q-space /><q-btn icon="close" flat round dense v-close-popup /></q-card-section>
    <q-card-section class="q-gutter-xs">
      <q-input outlined v-model="data.title" label="Title" type="text" />
      <q-input outlined v-model="data.address" label="Address" type="textarea" style="height: 5rem" />
      <q-input outlined v-model="data.location" label="Location" type="text" />
    </q-card-section>
    <q-card-actions align="right" class="q-px-md">
      <q-btn flat label="Cancel" color="primary" v-close-popup @click="reset" />
      <q-btn :loading="loading" label="SUBMIT" color="primary" @click="submit" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "AddressFormCard",
  props: ['id','customer'],
  data(){ return {
    loading: false,
    data: { title:'', address:'', location:'' }
  } },
  computed: {
    adr(){ return this.id ? this.$store.getters['CUSTOMERS/address'][this.id] : {} }
  },
  methods: {
    reset(){ this.data.title = this.data.address = this.data.location = '' },
    submit(){
      this.loading = true;
      if(!this.data.address || !this.data.title) return this.loading = false;
      let sData = _.assign({},this.data,{ customer: this.customer });
      if(this.id) sData['id'] = this.id;
      this.$store.dispatch('CUSTOMERS/address',sData)
        .then((data) => {
          this.loading = false;
          this.$emit('done',data);
          this.reset()
        })
    }
  },
  watch: {
    id: {
      immediate: true,
      handler(id){ if(id) _.forEach(this.adr,(val,key) => _.has(this.data,key) ? (this.data[key] = val) : null); else this.reset() }
    }
  }
}
</script>
