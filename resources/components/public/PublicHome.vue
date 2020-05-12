<template>
    <section class="home">
        <input type="text" class="form-control filter-control mb-2" v-model="filter" placeholder="search..">
        <ItemList v-if="filter" :items="filter_items" title="Search Results" />
        <div v-else>
            <ItemList class="mt-3" title="Exclusive Items" :items="exclusive" v-if="exclusive.length" :limit="exclusive_nos" />
            <ItemList class="mt-3" title="Latest Items" :items="latest_items" v-if="latest_items.length" :limit="latest" />
            <CategoriesList class="mt-3" v-if="categories.length > 1" />
            <ItemList class="mt-3" :items="other_items" :limit="categories.length > 1 ? 8 : 16" />
        </div>
    </section>
</template>

<script>
    import Items from "../admin/Items";
    export default {
        name: "PublicHome",
        components: {Items},
        data(){ return { filter: '',exclusive_nos:8,latest:8 } },
        computed: {
            filter_items(){ return this.filter ? _(this.slugs).map((v,k) => _.includes(v,_.toLower(this.filter)) ? _.toInteger(k) : null).filter().value() : [] },
            items(){ return _(this.$store.getters["ITEMS/all"]).keys().map(_.toInteger).value() },
            exclusive(){ return _(this.$store.state.SOURCE.SOURCE.items).keys().map(_.toInteger).value() },
            latest_items(){ return _.difference(_.map(this.$store.getters["ITEMS/getLatest"](),_.toInteger) || [],this.exclusive.slice(0,this.exclusive_nos)) },
            other_items(){ return _.difference(this.items,this.exclusive.slice(0,this.exclusive_nos),this.latest_items.slice(0,this.latest)) },
            slugs(){ return this.$store.getters["ITEMS/slugs"] },
            categories(){ return _.keys(this.$store.state.CATEGORIES.CATEGORIES) },
        }
    }
</script>