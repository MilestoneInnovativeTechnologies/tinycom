<template>
  <q-card>
    <q-card-section><div class="text-h6">Cart ID: {{ cart.id }}</div></q-card-section>
    <q-list dense bordered separator>
      <q-item v-for="(key,head) in layout" :key="['cart','detail','head',key].join('-')">
        <q-item-section>{{ head }}</q-item-section>
        <q-item-section side>{{ cart[key] }}</q-item-section>
      </q-item>
    </q-list>
    <q-list separator>
      <q-item-section><q-item-label header>Items</q-item-label></q-item-section>
      <q-item v-for="item in cart.items" :key="['cart','detail','item',item.item].join('-')">
        <q-item-section avatar><q-icon name="done_all" color="primary" /></q-item-section>
        <q-item-section>
          <q-item-label>{{ itemName(item.item) }}</q-item-label>
          <q-item-label caption>{{ item.price }} X <q-badge color="dark">{{ item.quantity }}</q-badge></q-item-label>
        </q-item-section>
        <q-item-section side class="text-primary text-weight-bolder">{{ item.amount }}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section>&nbsp;</q-item-section>
        <q-item-section side style="font-size: 1.25rem" class="text-primary text-weight-bolder">{{ cart.total }}</q-item-section>
      </q-item>
    </q-list>
    <q-list separator bordered class="q-pb-sm">
      <q-item>
        <q-item-section>
          <q-item-label class="text-weight-bold">Delivery Address</q-item-label>
          <q-item-label caption v-html='cart.address_text.replace("\n","<br >")' />
        </q-item-section>
      </q-item>
      <q-item v-if="cart.note">
        <q-item-section>
          <q-item-label class="text-weight-bold">Order Note:</q-item-label>
          <q-item-label caption>{{ cart.note }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
export default {
  name: "CartDetailCard",
  props: ['id','live'],
  data() { return {
    layout: { Customer:'customer_name',Phone:'customer_phone',Status:'status',Source:'source_title','Last Updated':'updated' }
  } },
  computed: {
    live_carts(){ return this.$store.getters['CARTS/live'] },
    cart(){ return this.live ? _.head(_.filter(this.live_carts,['id',this.id])) : this.$store.getters['CARTS/cart'](this.id) },
  },
  methods: {
    itemName(id){ return _.get(this.$store.state.ITEMS.ITEMS,[id,'name'],id) }
  }

}
</script>
