<template>
    <section class="home">
        <input type="text" class="form-control filter-control mb-2" v-model="filter" placeholder="search..">
        <ItemList v-if="filter" :items="items" title="Search Results" />
        <ExclusiveItems v-if="exclusive" class="mt-3" />
        <LatestItems class="mt-3" />
        <CategoriesList class="mt-3" />
    </section>
</template>

<script>
    import Items from "../admin/Items";
    export default {
        name: "PublicHome",
        components: {Items},
        data(){ return { filter: '', max:10 } },
        computed: {
            exclusive(){ return !!this.$store.getters["SOURCE/has"]() },
            slugs(){ return this.$store.getters["ITEMS/slugs"] },
            items(){ return this.filter ? _(this.slugs).map((v,k) => _.includes(v,_.toLower(this.filter)) ? _.toInteger(k) : null).filter().value() : []}
        },
    }
</script>