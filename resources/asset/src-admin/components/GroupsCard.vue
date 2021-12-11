<template>
  <q-card>
    <q-card-section><div class="text-h6">Groups</div></q-card-section>
    <q-list separator padding>
      <q-item>
        <q-item-section><q-item-label caption><q-input label="New Group Name" outlined dense v-model="name" /></q-item-label></q-item-section>
        <q-item-section side class=""><q-btn icon="save" dense color="primary" round @click="create" :loading="loading" /></q-item-section>
      </q-item>
      <q-item v-for="group in GROUPS" :key="'customer-group-' + group.id" clickable v-ripple @click="update(group.id)">
        <q-item-section>
          <q-item-label class="text-bold">{{  group.name }}</q-item-label>
          <q-item-label caption lines="3">{{ (group.customers || []).length  }} Customers: {{ getNames(group.customers).join(', ') }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-dialog persistent full-width v-model="edit">
      <GroupUpdateCard :id="item" @done="done" />
    </q-dialog>
  </q-card>
</template>

<script>
import { mapState } from 'vuex'
import GroupUpdateCard from "components/GroupUpdateCard";
export default {
  name: "GroupsCard",
  components: {GroupUpdateCard},
  data(){ return { name: '', loading: false, item: null, edit: false } },
  computed: {
    ...mapState('CUSTOMERS',['GROUPS','CUSTOMERS']),
    names(){ return _(this.CUSTOMERS).keyBy('id').mapValues('name').value() }
  },
  methods: {
    getNames(ids){ return _.map(ids || [],id => this.names[id]) },
    create(){
      this.loading = true; if(!this.name) return this.loading = false;
      this.$store.dispatch('CUSTOMERS/group',{ name: this.name })
        .then(() => (this.loading = false || this.name == ''))
    },
    update(id){ this.item = id; this.edit = true },
    done(){ this.item = null; this.edit = false },
  }
}
</script>
