<template>
    <section class="home">
        <input type="text" class="form-control filter-control mb-2" v-model="filter" placeholder="search..">
        <ItemList v-if="filter" :items="filter_items" title="Search Results" />
        <ExclusiveItems v-if="exclusive" class="mt-3" />
        <LatestItems class="mt-3" />
        <CategoriesList class="mt-3" v-if="categories.length > 1" />
        <ItemList v-else-if="items.length < max" :items="other_items" title="Other Items" />
        <ItemList v-else :items="other_items.slice(0,8)" title="Other Items" />
    </section>
</template>

<script>
    import Items from "../admin/Items";
    export default {
        name: "PublicHome",
        components: {Items},
        data(){ return { filter: '', max:20 } },
        computed: {
            exclusive(){ return !!this.$store.getters["SOURCE/has"]() },
            slugs(){ return this.$store.getters["ITEMS/slugs"] },
            filter_items(){ return this.filter ? _(this.slugs).map((v,k) => _.includes(v,_.toLower(this.filter)) ? _.toInteger(k) : null).filter().value() : [] },
            categories(){ return _.keys(this.$store.state.CATEGORIES.CATEGORIES) },
            items(){ return _.keys(this.$store.getters["ITEMS/all"]) },
            other_items(){ return _.difference(this.items,this.filter_items) }
        }
    }
</script>