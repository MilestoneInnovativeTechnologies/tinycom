<template>
    <section class="carts-all">
        <RecordList :records="carts" :layout="layout" truncate="20" title="Pending Orders" route="order" :limit="15" />
    </section>
</template>

<script>
    export default {
        name: "Orders",
        data(){ return {
            layout: { ID:'id',Customer:'customer_name',Amount:'total' }
        } },
        computed: {
            carts(){ return _(this.$store.getters["CARTS/all"]).filter(['status','Ordered']).sortBy(({ time }) => _.toInteger(time)).reverse().value() },
        }
    }
</script>