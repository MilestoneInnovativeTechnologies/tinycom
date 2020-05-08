<template>
    <section class="carts-all">
        <RecordList :records="confirms" :layout="layout" truncate="20" title="Confirmed" route="bill" />
    </section>
</template>

<script>
    import RecordList from "./RecordList";
    export default {
        name: "Confirms",
        components: {RecordList},
        data(){ return {
            layout: { ID:'id',Customer:'customer_name',Amount:'amount' }
        } },
        computed: {
            confirms(){ return _(this.$store.getters["CARTS/all"]).filter(['status','Confirmed']).sortBy(({ time }) => _.toInteger(time)).reverse().value() },
        }
    }
</script>