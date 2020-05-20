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
        <div class="d-flex mt-2">
            <input type="text" class="form-control-sm flex-grow-1" placeholder="search" v-model="search">
            <button class="btn btn-outline-primary btn-sm ml-2 flex-grow-0" @click.prevent="create(false)">Add New</button>
        </div>
        <h5 class="mt-3 d-flex"><span class="mt-1">Active Items</span><button class="ml-auto btn btn-outline-info btn-sm" @click.prevent="$router.push({ name:'price_stock_update' })"><i class="fas fa-chart-pie fa-fw"></i> Price Stock Update</button></h5>
        <div class="table-responsive"><table class="table table-sm">
            <thead><tr><th>#</th><th>Name</th><th> </th></tr></thead>
            <tbody>
                <tr v-for="item in active" :key="'item-list-item-'+item.id"><td>{{ item.id }}</td><td>{{ item.name }}</td><td><button @click="$router.push({ name:'item_update',params:{ id:item.id } })" class="btn btn-sm btn-link pt-0"><i class="fas fa-angle-double-right"></i></button></td></tr>
            </tbody>
        </table></div>
        <h5 class="mt-1">Inactive Items</h5>
        <div class="table-responsive"><table class="table table-sm">
            <thead><tr><th>#</th><th>Name</th><th> </th></tr></thead>
            <tbody>
            <tr v-for="item in inactive" :key="'item-list-item-'+item.id"><td>{{ item.id }}</td><td>{{ item.name }}</td><td><button @click="$router.push({ name:'item_update',params:{ id:item.id } })" class="btn btn-sm btn-link pt-0"><i class="fas fa-angle-double-right"></i></button></td></tr>
            </tbody>
        </table></div>
    </section>
</template>

<script>
    import RecordList from "./RecordList";
    export default {
        name: "ItemList",
        components: {RecordList},
        data(){ return {
            search: '', ic: 0
        } },
        computed: {
            grouped(){ return _(this.$store.getters["ITEMS/all"]).filter(({ name,description }) => _.isEmpty(this.search) || _.includes(_.toLower(name+description),_.toLower(this.search))).groupBy('status').value() },
            active(){ return _.get(this.grouped,'Y',[]) },
            inactive(){ return _.get(this.grouped,'N',[]) },
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