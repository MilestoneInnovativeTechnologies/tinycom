<template>
    <section class="carts">
        <RecordList :records="carts" :layout="layout" truncate="20" title="Recent Orders" route="cart" />
        <button class="btn-block btn-outline-info btn mt-2" @click="$router.push({ name:'carts' })">View All</button>
    </section>

</template>

<script>
    export default {
        name: "CartsRecent",
        data(){ return {
            layout: { ID:'id',Customer:'customer_name',Status:'status','Updated':'updated',Source:'source_title' }
        } },
        computed: {
            carts(){ return this.$store.getters["CARTS/recent"] },
        }
    }
</script>

