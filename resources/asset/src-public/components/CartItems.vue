<template>
  <q-list separator>
    <q-item clickable v-for="(item,idx) in items" :key="'cart-item-'+idx" class="q-py-md">
      <q-item-section>
        <q-item-label class="font-weight-bold text-primary" style="font-size: 1.1rem">{{ name(item.item) }}</q-item-label>
        <q-item-label class="row">
          <div class="col-2">{{ item.price }}</div>
          <div class="col-7">X <q-badge color="dark">{{ item.quantity }}</q-badge></div>
          <div class="col-3 font-weight-bold text-primary" style="font-size: 1.1rem">{{ item.amount }}</div>
        </q-item-label>
      </q-item-section>
      <q-item-section side class="q-gutter-xs">
        <q-btn color="primary" size="xs" class="q-py-xs q-px-none" @click.prevent="increment(item.item)" :disable="disabled(item.item)" icon="add" />
        <q-btn color="primary" size="xs" class="q-py-xs q-px-none" @click.prevent="decrement(item.item)" icon="remove" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
  export default {
    name: "CartItems",
    computed: {
      items(){ return this.$store.state.CART.items },
      details(){ return this.$store.getters["CART/details"] },
      name(){ return (id) => _.get(this.details,[id,'name']) },
      desc(){ return (id) => _.get(this.details,[id,'description']) },
      total(){ return this.$store.getters['CART/total'] },
      disabled(){ return (id) => _.toInteger(_.get(this.$store.getters["ITEMS/left"],_.toInteger(id))) <= 0 },
    },
    methods: {
      increment(item){ this.$store.dispatch('CART/increment',item) },
      decrement(item){ this.$store.dispatch('CART/decrement',item) },
    }
  }
</script>
