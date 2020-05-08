<template>
    <section class="item-list px-3">
        <h5 class="text-info border-info pb-1" v-if="title">{{ title }}</h5>
        <div class="row">
            <div class="col-12 col-lg-6 my-1 shadow-sm px-0" v-for="item_id in items" :key="'item-list-item' + item_id" ><item :id="item_id"></item></div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ItemList",
        props: ['items','title'],
    }
</script>