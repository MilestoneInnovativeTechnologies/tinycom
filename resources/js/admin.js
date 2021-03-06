/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.Vuex = require('vuex');
import VueRouter from "vue-router"
window.VueGraph = require('vue-graph');

Vue.use(VueRouter,Vuex,VueGraph)

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

const files = require.context('./../components/admin/', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const store = require('./store/admin').store
const routes = require('./routes/admin').routes
const routerOptions = { routes,mode:'hash',linkActiveClass:'active',tag:'li' }

require('./graph/index')

_.forEach(require('./filters').adminFilters,(fn,fl) => Vue.filter(fl,fn))

const router = new VueRouter(routerOptions)
const app = new Vue({
    router,store,
    el: '#application',
    data: {
        actions: false,
        COMPANY
    },
    computed: {
        header(){ return this.$route.params.header || this.COMPANY || 'Tiny COM' },
    },
    methods: {
        alterFAB(){ this.actions = !this.actions; $('.nav_actions').css('height',this.actions ? '60vh' : '0vh') }
    },
    created() {
        $('#admin_bottom_spacer').height($('.navbar.fixed-bottom').outerHeight()+'px');
    },
    mounted(){
        _.forEach(['CARTS','CUSTOMERS','ITEMS','SOURCES'],module => this.$store.dispatch(`${module}/init`).then(null))
        setTimeout(($vm) => $vm.$store.dispatch('CARTS/orders').then(null),10000,this);
    }
});
