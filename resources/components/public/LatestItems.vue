<template>
    <section class="latest-items px-3">
        <h5 class="text-info border-info pb-1">Latest Items </h5>
        <div class="row">
            <div class="col-12 col-lg-6 my-1 shadow-sm px-0" v-for="item_id in items" :key="['latest','item',item_id].join('-')" ><item :id="item_id"></item></div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "LatestItems",
        props: { start: { default:0 }, length: { default: 4 } },
        computed: {
            items(){ return this.$store.getters["ITEMS/getLatest"](this.length) },
        }
    }
</script>