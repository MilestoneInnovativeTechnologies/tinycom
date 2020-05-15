<template>
    <div class="form-inline">
        <button @click.prevent="decrement" class="btn btn-sm btn-info"><i class="fas text-white fa-level-up-alt fa-rotate-180"></i></button>
        <input type='text' name='quantity' v-model="quantity" class='form-control form-control-sm border-0 text-center font-weight-bold text-info' style="width: 2rem" />
        <button @click.prevent="increment" class="btn btn-sm btn-info" :class="{ disabled }" :disabled="disabled"><i class="fas text-white fa-level-up-alt"></i></button>
    </div>
</template>

<script>
    export default {
        name: "CartIncrementDecrement",
        props: ['id'],
        computed: {
            quantity(){ return this.$store.getters['CART/itemQuantity'](this.id) },
            disabled(){ return _.toInteger(_.get(this.$store.getters["ITEMS/left"],_.toInteger(this.id))) <= 0 },
        },
        methods: {
            increment(){ this.$store.dispatch('CART/increment',this.id) },
            decrement(){ this.$store.dispatch('CART/decrement',this.id) },
        },
    }
</script>