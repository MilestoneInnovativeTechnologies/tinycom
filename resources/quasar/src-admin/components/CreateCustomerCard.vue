<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none"><div class="text-h6">Add New Customer</div><q-space /><q-btn icon="close" flat round dense v-close-popup /></q-card-section>
    <q-card-section>
      <q-form autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" class="q-gutter-sm" ref="create_customer_form">
        <q-input type="text" name="name" label="Name" v-model="name" dense outlined />
        <q-input type="number" name="phone" label="Phone" v-model="phone" dense outlined />
        <q-input type="textarea" name="address" label="Address" v-model="address" dense outlined />
      </q-form>
    </q-card-section>
    <q-card-actions align="right" class="q-px-md q-pt-none">
      <q-btn push label="Submit" color="primary" @click="create" :loading="loading" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "CreateCustomerCard",
  data(){ return {
    loading: false,
    name: '', phone: '', address: ''
  } },
  computed: {
  },
  methods: {
    create(){
      this.loading = true;
      if(this.name && this.phone) this.$store.dispatch('CUSTOMERS/create',new FormData(this.$refs['create_customer_form'].$el))
        .then(() => { this.loading = false; this.name = this.phone = this.address = ''; this.$emit('created'); });
      else this.loading = false;
    }
  }
}
</script>
