<template>
  <q-tr>
    <q-td>{{ id }}</q-td>
    <q-td><q-select :options="options" dense square outlined v-model="status" style="width: 3rem;"></q-select></q-td>
    <q-td><q-input type="text" dense square outlined v-model="name" style="width: 8rem" :debounce="1000" /></q-td>
    <q-td><q-input type="textarea" dense square outlined v-model="description" style="width: 8rem; height: 4rem" :debounce="1000" /></q-td>
    <q-td><q-btn icon="double_arrow" flat size="sm" color="primary" :to="{ name:'item',params:{ id } }" /></q-td>
  </q-tr>
</template>

<script>
export default {
  name: "ItemUpdateRow",
  props: ['id'],
  data(){ return {
    options: ['Y','N']
  } },
  computed: {
    name: {
      get(){ return this.$attrs.name },
      set(name){ this.dispatch({name}) },
    },
    description: {
      get(){ return this.$attrs.description },
      set(description){ this.dispatch({description}) },
    },
    status: {
      get(){ return this.$attrs.status },
      set(status){ this.dispatch({status}) },
    }
  },
  methods: {
    formData(data){ let frmData = new FormData; _.forEach(data,(value,key) => frmData.append(key,value)); return { id:this.id,data:frmData,item:'item',action:'update' } },
    dispatch(data){ this.$store.dispatch('SERVER/serverItemAction',this.formData(data)) }
  }
}
</script>
