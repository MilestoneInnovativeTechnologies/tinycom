<template>
  <q-table :title="title" :data="records" :columns="columns" dense :no-data-label="empty" :row-key="row_key" :pagination="{ rowsPerPage:limit || 5 }" rows-per-page-label="Per Page">
    <template v-if="route" v-slot:body-cell-action="props">
      <q-td :props="props">
        <q-btn dense flat icon="double_arrow" size="sm" color="primary" :to="{ name:route,params:{ id:props.value,back } }" />
      </q-td>
    </template>
  </q-table>
</template>

<script>
    export default {
        name: "RecordList",
        props: ['records','title','empty','limit','layout','route','row_key','back'],
        computed: {
          columns(){ return this.route ? _.concat(this.layout,[{ name:'action',field:this.row_key,label:' ' }]) : this.layout },
        },
    }
</script>
