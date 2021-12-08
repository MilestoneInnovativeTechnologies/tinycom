
window._ = require('lodash');
try {
    window.Popper = require('popper.js').default;
    require('bootstrap');
} catch (e) {

    console.log('Load error',e)

}

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.getElementsByName('csrf-token')[0].content;
window.axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
window.axios.defaults.baseURL = '/company/server/';

window.Vue = require('vue').default;
window.Vuex = require('vuex');
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(VueRouter,Vuex,BootstrapVue,IconsPlugin)

require('./../components/company')

const store = require('./store/company').store
const routes = require('./routes/company').routes

_.forEach(require('./filters').companyFilters,(fn,fl) => Vue.filter(fl,fn))

const router = new VueRouter({ routes })
Vue.mixin({ methods: { $post(item,action,data){ return new Promise(resolve => this.$store.dispatch('SERVER/post',{ item,action,data }).then(resolve)) } } });
const app = new Vue({
    router,store,
    el: '#application',
    data: {
        APP, LOGOUT
    }
});
