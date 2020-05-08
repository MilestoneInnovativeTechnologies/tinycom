<template>
    <section class="sources">
        <RecordList title="Sources" :records="records" :layout="layout" route="source" />
        <button v-if="add !== false" class="btn btn-primary btn-block fixed-bottom" style="z-index: 1050" @click.prevent="$router.push({ name:'source_create' })">Add</button>
    </section>
</template>

<script>
    export default {
        name: "Sources",
        props: ['add'],
        data(){ return {
            layout: { Title:'title',Hits:'hits',Expire:'expire',Orders:'orders' },
        } },
        computed: {
            records(){ return this.$store.getters["SOURCES/all"] }
        }
    }
</script>