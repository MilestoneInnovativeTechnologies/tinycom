<template>
  <q-page padding>
    <q-card flat style="max-width: 65vh;" class="q-mx-auto">
      <img :src="src">
      <CartItems />
      <q-card-section class="bg-grey-2 q-mt-sm">
        <div class="text-center text-primary">
          <div class="text-h4 font-weight-bolder">{{ total }}</div>
          <div class="body font-weight-bolder">TOTAL AMOUNT</div>
        </div>
      </q-card-section>
      <CartExtraSection class="q-mt-sm" />
      <q-card-actions class="q-mt-sm">
        <q-btn label="Back to Shop" color="primary" :to="{ name:'home' }" />
        <q-space />
        <q-btn v-if="user" label="Place Order" color="primary" @click="trigger(true)" />
        <q-btn v-else label="Login to Order" color="primary" :to="{ name:'profile' }"/>
      </q-card-actions>
    </q-card>
    <q-dialog v-if="user" v-model="ordered.trigger" persistent>
      <q-card>
        <q-card-section class="bg-grey-2"><div class="text-h6">Confirm Order Details</div></q-card-section>
        <q-card-section><div class="text-bold">Your order will be placed and a representative will call you to confirm delivery address.</div></q-card-section>
        <q-separator />
        <q-card-section>
          Please confirm the below details are correct and belongs to you, Delivery and billing will be done on these details.<br /><br />
          <strong>Name: </strong>{{ user.name }}<br />
          <strong>Phone: </strong>{{ user.phone }}<br />
          <strong>Address: </strong><span v-html="address"></span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="Back" @click="cancel" :disable="ordered.status"/>
          <q-btn color="primary" label="Confirm" :loading="ordered.status" @click="order" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-if="user" v-model="response" persistent>
      <q-card v-if="ordered.error">
        <q-card-section class="bg-grey-2"><div class="text-h6 text-negative">Error</div></q-card-section>
        <q-card-section><div class="text-bold">There is some error in placing your order. Please try again!!<hr /><strong>Server Response: </strong>{{ ordered.message }}</div></q-card-section>
        <q-card-actions>
          <q-btn class="full-width" color="primary" label="Restart Shopping" @click="move('start')" />
        </q-card-actions>
      </q-card>
      <q-card v-else>
        <q-card-section class="bg-grey-2"><div class="text-h6">Ordered Submitted Successfully</div></q-card-section>
        <q-card-section><div class="text-bold">Thank you for the trust in us. Your order placed successfully!!. Our representative will call you soon if required..</div></q-card-section>
        <q-card-actions>
          <q-btn class="full-width" color="primary" label="Continue Shopping" @click="move('start')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import CartItems from "components/CartItems";
import CartExtraSection from "components/CartExtraSection";
export default {
  name: 'PageCart',
  components: {CartExtraSection, CartItems},
  data(){ return {
    response: false
  } },
  computed: {
    images(){ return this.$store.getters['CART/images'] },
    src(){ return _.first(this.images) },
    total(){ return this.$store.getters['CART/total'] },
    user(){ return this.$store.state.USER.USER },
    ordered(){ return this.$store.state.CART.ordered },
    address(){ return _.get(this.$store.getters["USER/ADDRESS"][this.$store.state.CART.address],'address','').replace("\n","<br />") }
  },
  methods: {
    trigger(status){ this.$store.commit('CART/trigger',status === undefined ? true : status,{ root:true }) },
    order(){ this.$store.dispatch('CART/order').then(data => { this.trigger(false); this.response = true; }) },
    move(name){ this.response = false; return (name === 'start') ? (window.location.href = location.origin + "/r") : this.$router.push({ name:'home' }) },
    cancel(){ this.response = false; this.trigger(false) }
  }
}
</script>
