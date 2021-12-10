<template>
    <span class="text-red-14 q-ml-sm font-weight-bolder" v-if="warn"><q-icon name="add_shopping_cart" size="1.1rem" /> {{ left }} left</span>
</template>

<script>
    export default {
        name: "ItemStockWarn",
        props: ['id'],
        computed: {
            left(){ return _.toInteger(_.get(this.$store.getters["ITEMS/left"],_.toInteger(this.id))) },
            max(){ return this.$store.state.ITEMS.stock_warn_limit },
            warn(){ return this.left <= this.max },

        }
    }
</script>
