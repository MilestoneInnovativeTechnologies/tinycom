<template>
    <div class="modal-body">
        <div class="form-group row">
            <label for="name" class="col-3 col-form-label">Name</label>
            <div class="col-9"><input type="text" class="form-control" id="name" name="name" value=""></div>
        </div>
        <div class="form-group row">
            <label for="description" class="col-3 col-form-label">Details</label>
            <div class="col-9"><textarea class="form-control" id="description" name="description"></textarea><input type="hidden" name="status" value="Y"></div>
        </div>
        <div class="form-group row">
            <label for="image" class="col-3 col-form-label">Image</label>
            <div class="col-9"><input type="file" class="form-control-file" id="image" name="image"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CategoryCreateModalBody"
    }
</script>