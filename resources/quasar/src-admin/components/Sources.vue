<template>
  <RecordList :records="records" :layout="layout" row_key="id" limit="5" route="source" :back="source" empty="No any active sources!!" />
</template>

<script>
    import RecordList from "components/RecordList";
    export default {
      name: "Sources",
      components: {RecordList},
      props: ['add','source'],
        data(){ return {
          layout: [
            { name:'title',label:'Title',field:'title',align:'left' },
            { name:'hits',label:'Hits',field:'hits' },
            { name:'expire',label:'Expire',field:'expire',align:'left' },
            { name:'orders',label:'Orders',field:'orders' },
          ]
        } },
        computed: {
            records(){ return this.$store.getters["SOURCES/all"] }
        }
    }
</script>
