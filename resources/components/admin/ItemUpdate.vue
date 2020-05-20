<template>
    <section class="item-update">
        <form ref="item-update-form">
            <div class="form-group form-row">
                <label class="col-3 mt-2">Name</label>
                <input type="text" name="name" placeholder="Name" class="form-control col-9" :value="item.name">
            </div>
            <div class="form-group form-row">
                <label class="col-3 mt-2">Description</label>
                <textarea name="description" placeholder="Description" class="form-control col-9">{{ item.description }}</textarea>
            </div>
            <div class="form-group form-row">
                <label class="col-3 mt-2">Price</label>
                <input type="text" name="price" placeholder="Price" class="form-control col-9" :value="item.price">
            </div>
            <div class="form-group form-row">
                <label class="col-3 mt-2">Selling Price</label>
                <input type="text" name="selling" placeholder="Selling Price" class="form-control col-9" :value="item.selling">
            </div>
            <div class="form-group form-row">
                <label class="col-3 mt-2">Stock</label>
                <input type="text" name="stock" placeholder="Stock" class="form-control col-9" :value="item.stock">
            </div>
            <div class="form-group form-row">
                <label class="col-3 mt-2">Image</label>
                <input type="file" name="image" placeholder="Image" class="form-control-file col-9">
                <img v-show="item.image" :src="item.image" class="img-thumbnail rounded offset-3" width="96">
            </div>
            <div class="form-group form-row">
                <label class="col-3 mt-2">Status</label>
                <select name="status" class="form-control col-9"><option value="Y" :selected="item.status === 'Y'">Active</option><option value="N" :selected="item.status === 'N'">Inactive</option></select>
            </div>
            <div class="form-group form-row">
                <label class="col-3 mt-2">Categories</label>
                <div class="col-9 mt-1">
                    <div class="form-check" v-for="(category,c_id) in categories" :key="'check-item-category-category-'+c_id">
                        <input name="categories[]" :value="c_id" class="form-check-input" type="checkbox" :id="'category-item-'+c_id" :checked="item_categories && item_categories.indexOf(parseInt(c_id)) > -1">
                        <label class="form-check-label mt-1" :for="'category-item-'+c_id">{{ category }}</label>
                    </div>
                </div>
            </div>
            <div class="text-center text-success mb-2" v-if="msg[mi]"><i :class="'fas fa-'+icon[mi]"></i> {{ msg[mi] }}</div>
            <button class="btn btn-outline-primary btn-block" @click.prevent="update">Update</button>
        </form>
    </section>
</template>

<script>
    export default {
        name: "ItemUpdate",
        props: ['id'],
        data(){ return { mi:0, msg:['','Updating..','Updated!!'], icon:['','check','check-double'] } },
        computed: {
            categories(){ return _.mapValues(this.$store.state.CATEGORIES.CATEGORIES,'name') },
            item_categories(){ return _.get(this.$store.state.ITEMS.ITEM_CATEGORIES,_.toInteger(this.id)) },
            item(){ return this.$store.getters["ITEMS/item"](this.id) }
        },
        methods: {
            update(){
                this.mi++;
                this.$store.dispatch('SERVER/serverItemAction',{ id:this.id,data:new FormData(this.$refs['item-update-form']),item:'item',action:'update' })
                .then(R => { this.mi++; setTimeout($vm => $vm.mi = 0,3500,this) })
            }
        }
    }
</script>