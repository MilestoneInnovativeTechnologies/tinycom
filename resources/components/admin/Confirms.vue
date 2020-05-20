<template>
    <section class="carts-all">
        <RecordList :records="confirms" :layout="layout" truncate="20" title="Confirmed Orders" route="bill" :limit="15" />
    </section>
</template>

<script>
    export default {
        name: "Confirms",
        data(){ return {
            layout: { ID:'id',Customer:'customer_name',Amount:'total' }
        } },
        computed: {
            confirms(){ return _(this.$store.getters["CARTS/all"]).filter(['status','Confirmed']).sortBy(({ time }) => _.toInteger(time)).reverse().value() },
        }
    }
</script>