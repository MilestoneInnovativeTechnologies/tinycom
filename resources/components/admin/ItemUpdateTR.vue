<template>
    <tr>
        <td><img v-show="image" :src="image" class="img-thumbnail rounded" width="48"><input :ref="'item-'+id+'-image'" type="file" @change="changeImage(id)" class="form-control-file"></td>
        <td><input type="text" class="form-control-sm" v-model.lazy="name"></td>
        <td><input type="text" class="form-control-sm" v-model.lazy="price"></td>
        <td><input type="text" class="form-control-sm" v-model.lazy="selling"></td>
        <td><input type="text" class="form-control-sm" v-model.lazy="stock"></td>
        <td><select class="form-control-sm" v-model.lazy="status"><option value="Y" :selected="status === 'Y' ? 'selected' : ''">Yes</option><option value="N" :selected="status === 'N' ? 'selected' : ''">No</option></select></td>
        <td><textarea class="form-control-sm" v-model.lazy="description"></textarea></td>
        <td></td>
    </tr>
</template>

<script>
    export default {
        name: "ItemUpdateTR",
        props: ['id'],
        computed: {
            item(){ return this.$store.state.ITEMS.ITEMS[this.id] },
            name: {
                get(){ return _.get(this.item,'name') },
                set(name){ this.dispatch({name}) },
            },
            description: {
                get(){ return _.get(this.item,'description') },
                set(description){ this.dispatch({description}) },
            },
            status: {
                get(){ return _.get(this.item,'status') },
                set(status){ this.dispatch({status}) },
            },
            price: {
                get(){ return _.get(this.item,'price') },
                set(price){ this.dispatch({price}) },
            },
            selling: {
                get(){ return _.get(this.item,'selling') },
                set(selling){ this.dispatch({selling}) },
            },
            stock: {
                get(){ return _.get(this.item,'stock') },
                set(stock){ this.dispatch({stock}) },
            },
            image(){
                return _.isEmpty(this.item.media) ? null : imageUrl(this.item.media[0])
            },
        },
        methods: {
            changeImage(id){ this.$store.dispatch('SERVER/serverItemAction',this.formData({ image:this.$refs[`item-${id}-image`].files[0] })) },
            formData(data){ let fd = new FormData; _.forEach(data,(value,key) => fd.append(key,value)); return { id:this.id,data:fd,item:'item',action:'update' } },
            dispatch(data){ this.$store.dispatch('SERVER/serverItemAction',this.formData(data)) }
        }
    }
</script>
