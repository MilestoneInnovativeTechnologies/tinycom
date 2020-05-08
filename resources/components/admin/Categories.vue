<template>
    <section class="categories">
        <h5>Categories</h5>
        <div class="table-responsive">
            <table class="table table-sm">
                <thead><tr><th>ID</th><th>Name</th><th>Description</th><th>Active</th><th>Image</th></tr></thead>
                <tbody>
                    <CategoryUpdateTR v-for="id in categories" :key="['form','update','category',id].join('-')" :cid="id" />
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Categories",
        computed: {
            categories(){ return Object.keys(this.$store.state.CATEGORIES.CATEGORIES) }
        }
    }

</script>