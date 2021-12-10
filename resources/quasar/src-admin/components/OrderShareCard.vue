<template>
  <q-card>
    <q-card-section class="q-pb-xs">
      <div class="text-weight-bold">Share Order Summary</div>
    </q-card-section>
    <q-card-actions class="q-px-md">
      <q-btn push color="primary" class="q-px-sm" label="WhatsApp" @click="s_whatsapp" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { openURL } from 'quasar'
import { methods,t_whatsapp,t_items } from './../assets/templates'
export default {
  name: "OrderShareCard",
  props: ['id'],
  computed: {
    cart(){ return this.$store.getters['CARTS/cart'](this.id) },
    item_details(){ return this.$store.state.ITEMS.ITEMS }
  },
  methods: {
    s_whatsapp(){
      let template = t_whatsapp.replace(/\[(\w+)\]/g,(m,t,n) => {
        if(_.has(this,t)) return this[t](this.cart);
        if(_.has(methods,t)) return methods[t](this.cart);
        if(_.has(this.cart,t)) return this.cart[t]
        return '';
      })
      let text = encodeURI(template), phone = '91' + this.cart.customer_phone;
      openURL(urlParse('WHATSAPP',{ phone,text }).replace(/\?\_\=\d+/g,''));
    },
    items_text({ items }){
      let i_items_text = [], idx = 0;
      _.forEach(items,(item) => {
        idx++;
        i_items_text.push(t_items.replace(/\[(\w+)\]/g,(m,t,n) => {
          if(_.has(this,t)) return this[t](item,idx,this.item_details);
          else if(_.has(methods,t)) return methods[t](item,idx,this.item_details);
          else if(_.has(this.cart,t)) return this.cart[t];
          return '';
        }));
      })
      return i_items_text.join("\n")
    }
  }
}
</script>
