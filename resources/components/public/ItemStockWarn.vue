<template>
    <span class="badge ml-1 badge-light py-2 text-danger d-inline stock_warn" v-if="warn"><i class="fas fa-dolly mr-1"></i>{{ left }} left</span>
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