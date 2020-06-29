<template>
    <section class="categories">
        <div class="card mx-sm-auto" style="max-width: 65vh">
            <div class="card-header">
                Available categories
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item px-3 d-flex align-items-center justify-content-between" v-for="item in list" :key="'category-list-' + item.id" @click="$router.push({ name:'category-items',params:{ id:item.id } })">
                    <img class="img-thumbnail mr-2" :src="image(item.media)" width="48">
                    <span class="flex-grow-1 px-1">{{ item.name }}</span>
                    <button class="btn btn-link p-0"><i class="fas fa-angle-double-right"></i></button>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    export default {
        name: "CategoriesList",
        computed: {
            list(){ return this.$store.state.CATEGORIES.CATEGORIES },
        },
        methods: {
            image(media){ return media.length ? imageUrl(media[0]) : null }
        }
    }
</script>
