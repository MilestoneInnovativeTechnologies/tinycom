<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawDrawer" />
        <q-toolbar-title>{{ title }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :mini="miniState" mini-to-overlay :width="256" :breakpoint="128" bordered content-class="bg-grey-1" >
      <q-list class="text-primary" separator>
        <q-item clickable v-ripple v-for="(link,idx) in links" :key="'layout-link-' + idx" :to="{ name:snakeCase(link.menu) }">
          <q-item-section avatar><q-icon :name="link.icon" /></q-item-section>
          <q-item-section><q-item-label>{{ link.menu }}</q-item-label></q-item-section>
        </q-item>
        <q-item clickable v-ripple class="text-negative" tag="a" :href="LOGOUT">
          <q-item-section avatar><q-icon name="logout" /></q-item-section>
          <q-item-section><q-item-label>Logout</q-item-label></q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive exclude="PageItemUpdate,PageSourceCreate,PageCustomer,PageReport" :max="15">
        <router-view />
      </keep-alive>
      <Subscription />
    </q-page-container>

  </q-layout>
</template>

<script>
import Subscription from "components/Subscription";
const links = require('../router/routes').links
export default {
  components: {Subscription},
  data () {
    return {
      links,
      drawer: true,
      miniState: true,
      COMPANY, LOGOUT
    }
  },
  computed: {
    title(){ return this.$route.meta.title || COMPANY },
  },
  methods: {
    drawDrawer(){
      if(!this.drawer) return this.drawer = this.miniState = true;
      if(this.drawer && this.miniState) return this.miniState = false;
      if(this.drawer && !this.miniState) this.drawer = this.miniState = false;
    },
    snakeCase(text){ return _.snakeCase(text) },
  }
}
</script>
