<template>
    <div class="modal-body">
        <div class="form-group row">
            <label for="name" class="col-3 col-form-label">Name</label>
            <div class="col-9"><input type="text" class="form-control" id="name" name="name" value=""></div>
        </div>
        <div class="form-group row">
            <label for="category" class="col-3 col-form-label">Category</label>
            <div class="col-9"><select class="form-control" id="category" name="category"><option v-for="(category,id) in categories" :value="category.id" :key="'item-create-category-id-'+id">{{ category.name }}</option></select></div>
        </div>
        <div class="form-group row">
            <label for="description" class="col-3 col-form-label">Details</label>
            <div class="col-9"><textarea class="form-control" id="description" name="description"></textarea><input type="hidden" name="status" value="Y"></div>
        </div>
        <div class="form-group row">
            <label for="name" class="col-3 col-form-label">Price</label>
            <div class="col-9"><input type="text" class="form-control" id="price" name="price" value=""></div>
        </div>
        <div class="form-group row">
            <label for="name" class="col-3 col-form-label">Selling Price</label>
            <div class="col-9"><input type="text" class="form-control" id="selling" name="selling" value=""></div>
        </div>
        <div class="form-group row">
            <label for="name" class="col-3 col-form-label">Stock</label>
            <div class="col-9"><input type="text" class="form-control" id="stock" name="stock" value=""></div>
        </div>
        <div class="form-group row">
            <label for="image" class="col-3 col-form-label">Image</label>
            <div class="col-9"><input type="file" class="form-control-file" id="image" name="image"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ItemCreateModalBody",
        computed: {
            categories(){ return this.$store.state.CATEGORIES.CATEGORIES }
        }
    }
</script>