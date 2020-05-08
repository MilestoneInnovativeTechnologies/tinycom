<template>
    <tr>
        <td>{{ cid }}</td>
        <td><input type="text" class="form-control-sm" v-model.lazy="name"></td>
        <td><textarea class="form-control-sm" v-model.lazy="description"></textarea></td>
        <td><select class="form-control-sm" v-model.lazy="status"><option value="Y" :selected="status === 'Y' ? 'selected' : ''">Yes</option>
            <option value="N" :selected="status === 'N' ? 'selected' : ''">No</option></select></td>
        <td><img v-show="image" :src="image" class="img-thumbnail rounded" width="48"><input :ref="'category-'+cid+'-image'" type="file" @change="changeImage(cid)" class="form-control-file"></td>
    </tr>
</template>

<script>
    export default {
        name: "CategoryUpdateTR",
        props: ['cid'],
        computed: {
            category(){ return this.$store.state.CATEGORIES.CATEGORIES[this.cid] },
            name: {
                get(){ return this.category.name },
                set(name){ this.dispatch({name}) },
            },
            description: {
                get(){ return this.category.description },
                set(description){ this.dispatch({description}) },
            },
            status: {
                get(){ return this.category.status },
                set(status){ this.dispatch({status}) },
            },
            image(){
                return _.isEmpty(this.category.media) ? null : this.imageUrl(this.category.media[0].id,this.category.media[0].file_name)
            },
        },
        methods: {
            imageUrl(id,name){ return `http://tinycom/uploads/media/${id}/${name}`  },
            changeImage(id){ this.$store.dispatch('SERVER/updateCategory',this.formData({ image:this.$refs[`category-${id}-image`].files[0] })) },
            formData(data){ let fd = new FormData; _.forEach(data,(value,key) => fd.append(key,value)); return { id:this.cid,data:fd,item:'category',action:'update' } },
            dispatch(data){ this.$store.dispatch('SERVER/serverItemAction',this.formData(data)) }
        }
    }
</script>
