<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="title_bar_bg title_bar_text">
      <q-toolbar>
        <q-toolbar-title>
<!--          <q-avatar><img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg"></q-avatar>-->
          {{ COMPANY }}
        </q-toolbar-title>
        <NavbarUser />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <transition appear enter-active-class="animated fadeIn" mode="out-in" leave-active-class="animated fadeOut">
<!--        <keep-alive>-->
          <router-view />
<!--        </keep-alive>-->
      </transition>
    </q-page-container>
    <q-footer elevated class="title_bar_bg title_bar_text">
      <q-toolbar class="q-py-sm">

        <q-toolbar-title class="text-left" style="font-size: 0.8rem">
          <div style="font-size: 1.2rem"><q-icon name="shopping_cart" size="1.5rem" class="q-mr-xs" />{{ cartItems }}</div>
          <div>ITEMS</div>
        </q-toolbar-title>
        <q-toolbar-title class="text-center" style="font-size: 0.8rem">
          <div style="font-size: 1.2rem"><q-icon name="payments" size="1.5rem" class="q-mr-xs" />{{ cartTotal }}</div>
          <div>AMOUNT</div>
        </q-toolbar-title>
        <template v-if="page === 'cart'">
          <q-toolbar-title v-if="user" class="text-right" style="font-size: 0.8rem" @click="trigger">
            <div style="font-size: 1.2rem"><q-icon name="reply_all" size="1.5rem" class="q-mr-xs" style="transform: rotateY(180deg)" /></div>
            <div>ORDER</div>
          </q-toolbar-title>
          <q-toolbar-title v-else class="text-right" style="font-size: 0.8rem" @click="$router.push({ name:'profile' })">
            <div style="font-size: 1.2rem"><q-icon name="reply_all" size="1.5rem" class="q-mr-xs" style="transform: rotateY(180deg)" /></div>
            <div>LOGIN</div>
          </q-toolbar-title>
        </template>
        <q-toolbar-title v-else class="text-right" style="font-size: 0.8rem" @click="$router.push({ name:'cart' })">
          <div style="font-size: 1.2rem"><q-icon name="reply_all" size="1.5rem" class="q-mr-xs" style="transform: rotateY(180deg)" /></div>
          <div>CART</div>
        </q-toolbar-title>

      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import NavbarUser from "../components/NavbarUser";
export default {
  components: {NavbarUser},
  data () {
    return {
      COMPANY
    }
  },
  computed: {
    header(){ return this.$route.params.header || this.COMPANY || 'TinyCOM' },
    back(){ return window.history.length>0 && this.$route.name !== 'home' },
    cartTotal(){ return this.$store.getters['CART/total'] },
    cartItems(){ return this.$store.getters['CART/itemsCount'] },
    page(){ return this.$route.name },
    user(){ return this.$store.state.USER.USER },
  },
  mounted(){
    this.$store.dispatch('CART/init',CART).then(() => null)
    this.$store.dispatch('ITEMS/init').then(() => null)
  },
  methods: {
    trigger(){
      this.$store.commit('CART/trigger',true,{ root:true })
    }
  }
}
</script>
