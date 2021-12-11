<template>
  <q-card v-if="id">
    <q-card-section class="row items-center q-pb-none"><div class="text-h6">Update Group</div><q-space /><q-btn icon="close" flat round dense v-close-popup /></q-card-section>
    <q-card-section><q-input dense outlined label="Group Name" v-model="name" /></q-card-section>
    <q-list dense separator>
      <q-item tag="label" v-ripple v-for="customer in all" :key="'group-update-customer-' + customer.id">
        <q-item-section avatar><q-checkbox v-model="customers" :val="customer.id" color="primary" /></q-item-section>
        <q-item-section>
          <q-item-label>{{ customer.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-card-actions align="right" class="q-px-md">
      <q-btn @click="update" :loading="loading" label="Update" color="primary" padding="xs sm" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "GroupUpdateCard",
  props: ['id'],
  data(){ return {
    loading: false
  } },
  computed: {
    all(){ return this.$store.state.CUSTOMERS.CUSTOMERS },
    group(){ return _.find(this.$store.state.CUSTOMERS.GROUPS,['id',this.id]) },
    customers: {
      get(){ return this.group.customers || [] },
      set(customers){ this.$store.commit('CUSTOMERS/group',{ id:this.id,customers }) }
    },
    name: {
      get(){ return this.group.name || '' },
      set(name){ this.$store.commit('CUSTOMERS/group',{ id:this.id,name }) }
    }
  },
  methods: {
    update(){
      this.loading =  true;
      if(!this.name) return this.loading = false;
      this.$store.dispatch('CUSTOMERS/group',{ id:this.id,name:this.name,customers:this.customers })
        .then(() => { this.loading = false; this.$emit('done') })
    }
  }
}
</script>
