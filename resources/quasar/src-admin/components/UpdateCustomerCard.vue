<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none"><div class="text-h6">Update Customer</div></q-card-section>
    <q-card-section>
      <q-form autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" class="q-gutter-sm" ref="update_customer_form">
        <input type="hidden" name="id" v-model="id">
        <q-input type="text" name="name" label="Name" v-model="name" dense outlined />
        <q-input type="number" name="phone" label="Phone" v-model="phone" dense outlined />
      </q-form>
    </q-card-section>
    <q-card-actions align="right" class="q-px-md q-pt-none">
      <q-btn label="SHOP" color="primary" :to="{ name:'home' }" :loading="loading" />
      <q-space />
      <q-btn push label="Update" color="primary" @click="update" :loading="loading" />
      <q-btn flat @click="fetch" text-color="primary" label="fetch from server" size="sm" class="q-mt-md full-width" :loading="loading" />
    </q-card-actions>
  </q-card>
</template>

<script>
import InActiveItems from "components/InActiveItems";
export default {
  name: "UpdateCustomerCard",
  components: {InActiveItems},
  props: ['id'],
  data(){
    let {name,phone,address} = this.$store.getters["CUSTOMERS/customer"](this.id);
    return {
      loading: false, name, phone, address
  } },
  methods: {
    update(){
      this.loading = true;
      if(this.name && this.phone) this.$store.dispatch('CUSTOMERS/update',new FormData(this.$refs['update_customer_form'].$el))
        .then(() => this.loading = false);
      else this.loading = false;
    },
    fetch(){
      this.loading = true;
      this.$store.dispatch('CUSTOMERS/fetch',this.id)
      .then(data => ['name','phone','address'].forEach((k) => this[k] = data[k]))
      .finally(() => this.loading = false)
    }
  }
}
</script>
