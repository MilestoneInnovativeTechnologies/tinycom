<template>
  <q-card v-if="id">
    <q-card-section><div class="text-h6">Groups</div></q-card-section>
    <q-list dense separator>
      <q-item tag="label" v-ripple v-for="group in all" :key="'customer-group-update-' + group.id">
        <q-item-section avatar><q-checkbox v-model="groups" :val="group.id" color="primary" /></q-item-section>
        <q-item-section>
          <q-item-label>{{ group.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-card-actions class="q-px-md" align="right">
      <q-btn label="Update Groups" @click="update" color="primary" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "CustomerGroupsCard",
  props: ['id'],
  computed: {
    all(){ return this.$store.state.CUSTOMERS.GROUPS },
    groups: {
      get(){ return this.$store.getters['CUSTOMERS/groups'](this.id) },
      set(groups){ this.$store.commit('CUSTOMERS/groups', { customer:this.id,groups }) }
    }
  },
  methods: {
    update(){
      this.$store.dispatch('CUSTOMERS/groups',{ customer:this.id,groups:this.groups })
    }
  }
}
</script>
