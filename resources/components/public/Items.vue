<template>
    <section class="categories px-3 my-3">
        <h5 class="text-info border-info pb-1">{{ category_details.name }} <a class="more float-right text-muted mt-1">More <i class="ml-1 fas fa-chevron-right"></i></a></h5>
        <div class="row">
            <div class="col-12 col-lg-6 my-1 shadow-sm px-0" v-for="item_id in display" :key="[category,'items',item_id].join('-')" ><item :id="item_id"></item></div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Items",
        props: { start:{ default:0 },length: { default: 3 },category:Number },
        computed: {
            computed_category(){ return this.category || _.keys(this.$store.state.CATEGORIES.CATEGORIES)[0] },
            category_items(){ return this.$store.state.CATEGORIES.CATEGORY_ITEMS[this.computed_category] },
            display(){ return this.category_items.slice(this.start,this.start+this.length) },
            category_details(){ return this.$store.state.CATEGORIES.CATEGORIES[this.computed_category] }
        }
    }
</script>