<template>
    <section class="categories">
        <div class="card mx-sm-auto" style="max-width: 65vh">
            <div class="card-header">
                Available categories
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in list" :key="'category-list-' + item.id">
                    <img class="img-thumbnail mr-2" :src="image(item.media)" width="32">
                    {{ item.name }}
                    <button class="float-right btn btn-link" @click="$router.push({ name:'category-items',params:{ id:item.id } })">View <i class="fas fa-chevron-right ml-1"></i></button>
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
