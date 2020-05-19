/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import VueRouter from "vue-router";

require('./bootstrap');

window.Vue = require('vue');
window.Vuex = require('vuex');
window.VueRouter = require('vue-router');

Vue.use(VueRouter,Vuex)

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

const files = require.context('./../components/public/', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const store = require('./store/public').store
const routes = require('./routes/public').routes

_.forEach(require('./filters').publicFilters,(fn,fl) => Vue.filter(fl,fn))

const router = new VueRouter({ routes })
const app = new Vue({
    router,store,
    el: '#application',
    data: {
        COMPANY
    },
    computed: {
        header(){ return this.$route.params.header || this.COMPANY || 'Tiny COM' },
        back(){ return window.history.length>0 && this.$route.name !== 'home' },
        cartTotal(){ return this.$store.getters['CART/total'] },
        cartItems(){ return this.$store.getters['CART/itemsCount'] },
    },
    methods: {
        forward(){
            if(this.$route.name === 'cart' || this.$route.name === 'profile') return this.$store.commit('MISC/alterModal');
            this.$router.push({ name:'cart'})
        }
    },
    mounted(){
        this.$store.dispatch('CART/init',CART).then(() => null)
        this.$store.dispatch('ITEMS/init').then(() => null)
    },
    created(){
        $('#public_bottom_spacer').height(($('.navbar.fixed-bottom').outerHeight())+'px');
    }
});
