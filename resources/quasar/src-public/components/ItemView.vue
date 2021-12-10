<template>
  <q-card class="my-card">
    <q-img v-if="image" :src="image" basic>
      <div class="absolute-bottom text-h6">{{ item.name }}</div>
    </q-img>
    <q-card-section class="q-pt-sm" v-if="item.description">{{ item.description }}</q-card-section>
    <q-card-actions align="right">
      <q-chip text-color="white" color="primary" size="md" icon="widgets"> {{ stock_text }}</q-chip>
      <q-chip class="exclusive_chip" v-if="item.isExclusive" icon="favorite" label="Special Price" />
      <q-chip class="on_sale_chip" v-if="item.isOnSale" icon="star_rate" label="On Sale" />
    </q-card-actions>
    <q-separator />
    <q-list>
      <q-item clickable v-ripple>
        <q-item-section avatar><q-icon color="primary" name="payments" /></q-item-section>
        <q-item-section><q-item-label>Price</q-item-label></q-item-section>
        <q-item-section side style="font-size: 1.2rem">{{ price }}</q-item-section>
      </q-item>
      <q-separator inset="true" />
      <template v-if="item.isOnSale">
        <q-item clickable v-ripple>
          <q-item-section avatar><q-icon color="primary" name="local_offer" /></q-item-section>
          <q-item-section><q-item-label>Selling Price</q-item-label></q-item-section>
          <q-item-section side style="font-size: 1.2rem">{{ price_selling }}</q-item-section>
        </q-item>
        <q-separator inset="true" />
      </template>
      <template v-if="item.isExclusive">
        <q-item clickable v-ripple>
          <q-item-section avatar><q-icon color="primary" name="favorite" /></q-item-section>
          <q-item-section><q-item-label>Exclusive Price</q-item-label></q-item-section>
          <q-item-section side style="font-size: 1.2rem">{{ price_special }}</q-item-section>
        </q-item>
        <q-separator inset="true" />
      </template>
      <q-item clickable v-ripple>
        <q-item-section avatar><q-icon color="primary" name="widgets" /></q-item-section>
        <q-item-section><q-item-label>Availability</q-item-label></q-item-section>
        <q-item-section side>{{ stock_text }}</q-item-section>
      </q-item>
      <q-separator inset="true" />
      <q-item>
        <q-item-section><q-item-label></q-item-label></q-item-section>
        <q-item-section side>
          <CartIncrementDecrement :id="id" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
    import CartIncrementDecrement from "../components/CartIncrementDecrement";
    export default {
        name: "ItemView",
      components: {CartIncrementDecrement},
      props: ['id'],
        computed: {
            item(){ return this.$store.getters["ITEMS/item"](this.id) },
            image(){ return this.item.image ? imageUrl(this.item.media[0]) : null },
            price(){ return this.item.price },
            price_selling(){ return this.item.selling },
            price_special(){ return this.item.sellPrice },
            max(){ return this.$store.state.ITEMS.stock_warn_limit },
            stock_text(){ let left = this.item.left; return (left > this.max) ? 'In Stock' : (left <= 0 ? 'No Stock' : 'Few remaining') }
        }
    }
</script>
