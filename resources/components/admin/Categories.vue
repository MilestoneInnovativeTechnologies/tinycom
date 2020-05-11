<template>
    <section class="categories">
        <form enctype="multipart/form-data" ref="category_create_form">
            <div class="modal fade" tabindex="-1" role="dialog" ref="category_create_modal">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">New Category</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <CategoryCreateModalBody :key="cc" />
                        <div class="modal-footer"><button type="button" class="btn btn-primary" @click.prevent="create(true)" data-dismiss="modal">Add Category</button></div>
                    </div>
                </div>
            </div>
        </form>
        <h5 class="d-flex"><span class="mt-1">Categories</span> <input type="text" class="form-control-sm mx-auto" placeholder="search" v-model="search"> <button class="btn btn-primary btn-sm" @click.prevent="create(false)">Add</button></h5>
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
        data(){ return { search:'',cc:0 } },
        computed: {
            categories(){ return Object.keys(this.$store.state.CATEGORIES.CATEGORIES) }
        },
        methods: {
            create(post){
                if(!post) return $(this.$refs["category_create_modal"]).modal('show');
                let data = new FormData(this.$refs['category_create_form']);
                this.$store.dispatch('CATEGORIES/create',data).then(() => this.cc++)
            }
        }
    }

</script>