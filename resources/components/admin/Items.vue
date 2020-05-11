<template>
    <section class="items">
        <form enctype="multipart/form-data" ref="item_create_form">
            <div class="modal fade" tabindex="-1" role="dialog" ref="item_create_modal">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">New Item</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <ItemCreateModalBody :key="ic" />
                        <div class="modal-footer"><button type="button" class="btn btn-primary" @click.prevent="create(true)" data-dismiss="modal">Add Item</button></div>
                    </div>
                </div>
            </div>
        </form>
        <h5 class="d-flex"><span class="mt-1">Items</span> <input type="text" class="form-control-sm mx-auto" placeholder="search" v-model="search"> <button class="btn btn-primary btn-sm" @click.prevent="create(false)">Add</button></h5>
        <div class="table-responsive">
            <table class="table table-sm">
                <thead><tr><th>Image</th><th>Name</th><th>Price</th><th>Selling</th><th>Stock</th><th>Status</th><th>Description</th></tr></thead>
                <tbody>
                    <ItemUpdateTR v-for="id in items" :key="['form','update','item',id].join('-')" :id="id" />
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Items",
        data(){ return {
            search: '', ic: 0
        } },
        computed: {
            slugs(){ return _.mapValues(this.$store.state.ITEMS.ITEMS, obj => _(obj).values().join(' ').toLowerCase() ) },
            items(){ if(_.isEmpty(this.search)) return _.keys(this.slugs); let keys = [],search = _.toLower(this.search); _.forEach(this.slugs,(text,id) => (_.includes(text,search)) ? keys.push(id) : null); return keys },
        },
        methods: {
            create(post){
                if(!post) return $(this.$refs["item_create_modal"]).modal('show');
                let data = new FormData(this.$refs['item_create_form']), $commit = this.$store.commit, $category = $('[name="category"]',$(this.$refs["item_create_modal"])).val();
                this.$store.dispatch('ITEMS/create',data).then(R => {
                    this.ic++
                    if(R && R.id) $commit('CATEGORIES/addItem',{ item:R.id,category:$category })
                })
            }
        }
    }
</script>