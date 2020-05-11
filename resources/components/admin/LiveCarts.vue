<template>
    <section class="live-customers">
        <RecordList title="Live Carts" :records="carts" :layout="layout" route="live_cart" />
    </section>
</template>

<script>
    export default {
        name: "LiveCarts",
        data(){ return {
            layout: { Customer:'name',Amount:'total',Updated:'updated',Source:'source' }
        } },
        computed: {
            live(){ return this.$store.getters["CARTS/live"] },
            carts(){ return _(this.live).sortBy('time').reverse().value() },
        }
    }
</script>