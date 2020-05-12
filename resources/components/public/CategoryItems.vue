<template>
    <section class="category-items px-3">
        <h5 class="text-info border-info pb-1 d-flex"><span class="mr-3">{{ category.name }}</span> <input type="text" class="form-control flex-grow-1 ml-auto filter-control" v-model="filter" placeholder="filter.."></h5>
        <div class="row">
            <div class="col-12 col-lg-6 my-1 shadow-sm px-0" v-for="item_id in display" :key="['exclusive','item',item_id].join('-')" ><item :id="item_id"></item></div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "CategoryItems",
        data(){ return { filter: '' } },
        props: ['id'],
        computed: {
            category(){ return this.$store.state.CATEGORIES.CATEGORIES[this.id] },
            items(){ return this.$store.getters["CATEGORIES/items"](this.id) },
            slugs(){ return _.pick(this.$store.getters["ITEMS/slugs"],this.items) },
            result(){ return _(this.slugs).map((v,k) => _.includes(v,_.toLower(this.filter)) ? _.toInteger(k) : null).filter().value() },
            display(){ return _.intersection(this.items,this.result) }
        }
    }
</script>