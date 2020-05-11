<template>
    <section class="carts-all">
        <RecordList :records="delivered" :layout="layout" truncate="20" title="Delivered Orders" route="bill" :limit="15" />
    </section>
</template>

<script>
    export default {
        name: "Delivered",
        data(){ return {
            layout: { ID:'id',Customer:'customer_name',Amount:'amount' }
        } },
        computed: {
            delivered(){ return _(this.$store.getters["CARTS/all"]).filter(['status','Delivered']).sortBy(({ time }) => _.toInteger(time)).reverse().value() },
        }
    }
</script>