<template>
  <RecordList title="Live Carts" :records="carts" :layout="layout" route="live" row_key="id" />
</template>

<script>
    import RecordList from "components/RecordList";
    export default {
        name: "LiveCarts",
      components: {RecordList},
      data(){ return {
            layout: [
              { name:'customer',label:'Customer',field:'name',align:'left' },
              { name:'amount',label:'Amount',field:'total' },
              { label:'Updated',field:'updated',name:'updated',align:'left' },
              { label:'Source', field:'title',name:'source',align:'left' }
            ]
        } },
        computed: {
            live(){ return this.$store.getters["CARTS/live"] },
            carts(){ return _(this.live).sortBy('time').reverse().value() },
        }
    }
</script>
