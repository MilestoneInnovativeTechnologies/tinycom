<template>
    <q-tr>
        <q-td><q-input type="text" dense outlined debounce="1000" v-model="price" /></q-td>
        <q-td><q-input type="text" dense outlined debounce="1000" v-model="selling" /></q-td>
        <q-td><q-input type="text" dense outlined debounce="1000" v-model="stock" /></q-td>
    </q-tr>
</template>

<script>
    export default {
        name: "StockUpdateRow",
        props: ['id'],
        computed: {
            item(){ return this.$store.state.ITEMS.ITEMS[this.id] },
            price: {
                get(){ return _.get(this.$attrs,'price') },
                set(price){ this.dispatch({price}) },
            },
            selling: {
                get(){ return _.get(this.$attrs,'selling') },
                set(selling){ this.dispatch({selling}) },
            },
            stock: {
                get(){ return _.get(this.$attrs,'stock') },
                set(stock){ this.dispatch({stock}) },
            },
        },
        methods: {
            formData(data){ let frmData = new FormData; _.forEach(data,(value,key) => frmData.append(key,value)); return { id:this.id,data:frmData,item:'item',action:'update' } },
            dispatch(data){ this.$store.dispatch('SERVER/serverItemAction',this.formData(data)) }
        }
    }
</script>
