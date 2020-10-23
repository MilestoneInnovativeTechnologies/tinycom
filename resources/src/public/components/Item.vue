<template>
  <q-card>
    <q-card-section horizontal>
      <q-card-section class="col-5 flex flex-center q-py-xs" @click="$router.push({ name:'item',params:{ id } })"><q-img class="rounded-borders" :src="image" height="5rem" /></q-card-section>
      <q-card-section class="q-pa-xs text-primary fit row wrap flex-center" style="min-height: 7rem">
        <div class="col-12" style="height: 3rem; line-height: 1.25" :style="prop('name').length > 35 ? { fontSize:'0.8rem' } : {}" @click="$router.push({ name:'item',params:{ id } })">
          <div class="float-right" v-if="sale || exclusive">
            <q-chip class="exclusive_chip" size="0.75rem" v-if="exclusive"><q-spinner-hearts class="q-mr-xs" />For You</q-chip>
            <q-chip class="on_sale_chip" size="0.75rem" v-else-if="sale"><q-spinner-pie class="q-mr-xs" />On Sale</q-chip>
          </div>
          {{ prop('name') }}
        </div>
        <div class="col-grow" @click.prevent="$router.push({ name:'item',params:{ id } })">
          <q-spinner-rings v-if="exclusive" color="primary" /><span style="font-size: 1.1rem">{{ price | number }}</span>
          <del v-if="sale || exclusive" class="block text-grey">{{ prop('price') | number }}</del>
        </div>
        <div class="bottom-row q-pr-sm text-center">
          <ItemStockWarn :id="id" />
          <CartIncrementDecrement :id="id" />
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
    import CartIncrementDecrement from "./../components/CartIncrementDecrement";
    import ItemStockWarn from "./../components/ItemStockWarn";
    export default {
        name: "Item",
      components: {ItemStockWarn, CartIncrementDecrement},
      props: ['id'],
        data(){ return { totalShow:false } },
        computed: {
            item(){ return this.$store.getters['ITEMS/item'](this.id) },
            sale(){ return this.prop('isOnSale') },
            exclusive(){ return this.prop('isExclusive') },
            price(){ return this.prop('sellPrice') },
            quantity(){ return this.$store.getters['CART/itemQuantity'](this.id) },
            image(){ return this.prop('image') },
        },
        methods: {
          increment(){ this.$store.dispatch('CART/increment',this.id) },
          decrement(){ this.$store.dispatch('CART/decrement',this.id) },
          prop(prop){ return _.get(this.item,prop,'') }
        }
    }
</script>
