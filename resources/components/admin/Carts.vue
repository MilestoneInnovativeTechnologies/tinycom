<template>
    <section class="carts-all">
        <RecordList :records="carts" :layout="layout" truncate="20" title="Orders" route="cart" />
    </section>
</template>

<script>
    export default {
        name: "Carts",
        data(){ return {
            layout: { ID:'id',Customer:'customer_name',Status:'status','Updated':'updated',Source:'source_title' }
        } },
        computed: {
            carts(){ return this.$store.getters["CARTS/all"] },
        }
    }
</script>

