<template>
    <section class="exclusive-items px-3 my-3">
        <h5 class="text-info border-info pb-1">Exclusive Items <a v-if="!$route.params.length" class="more float-right text-muted mt-1" @click.prevent="$router.push({ name:'exclusive',params:{ length:total } })">More <i class="ml-1 fas fa-chevron-right"></i></a></h5>
        <div class="row">
            <div class="col-12 col-lg-6 my-1 shadow-sm px-0" v-for="item_id in display" :key="['exclusive','item',item_id].join('-')" ><item :id="item_id"></item></div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ExclusiveItems",
        props: { start: { default:0 }, length: { default: 5 } },
        computed: {
            displayLength(){ return this.$route.params.length || this.length },
            items(){ return Object.keys(this.$store.SOURCE.SOURCE.items) },
            display(){ return this.items.slice(0,this.displayLength) },
            total(){ return this.items.length },
        }
    }
</script>