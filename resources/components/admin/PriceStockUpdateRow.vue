<template>
    <tr>
        <td><input type="text" class="form-control" v-model.lazy="price"></td>
        <td><input type="text" class="form-control" v-model.lazy="selling"></td>
        <td><input type="text" class="form-control" v-model.lazy="stock"></td>
    </tr>
</template>

<script>
    export default {
        name: "PriceStockUpdateRow",
        props: ['id'],
        computed: {
            item(){ return this.$store.state.ITEMS.ITEMS[this.id] },
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
        },
        methods: {
            formData(data){ let fd = new FormData; _.forEach(data,(value,key) => fd.append(key,value)); return { id:this.id,data:fd,item:'item',action:'update' } },
            dispatch(data){ this.$store.dispatch('SERVER/serverItemAction',this.formData(data)) }
        }
    }
</script>