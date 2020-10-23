<template>
  <div>
    <q-btn icon="remove" dense color="primary" unelevated size="sm"  @click.prevent="decrement" />
    <a class="text-center inline-block text-weight-bolder" style="width: 30px">{{ quantity}}</a>
    <q-btn icon="add" dense color="primary" unelevated size="sm" @click.prevent="increment" :disable="disabled" />
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
