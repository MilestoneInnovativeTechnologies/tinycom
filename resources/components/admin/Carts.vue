<template>
    <section class="carts-all">
        <RecordList :records="carts" :layout="layout" truncate="20" :limit="10" title="Carts" route="cart" />
    </section>
</template>

<script>
    export default {
        name: "Carts",
        data(){ return {
            layout: { ID:'id',Customer:'customer_name',Status:'status','Updated':'updated',Source:'source_title' }
        } },
        computed: {
            carts(){ return _(this.$store.getters["CARTS/all"]).sortBy(({ updated_at }) => new Date(updated_at).getTime()).reverse().value() },
        }
    }
</script>

