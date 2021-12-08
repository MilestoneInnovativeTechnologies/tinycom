
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
window.axios.defaults.baseURL = '/client/server/';

window.Vue = require('vue').default;
window.Vuex = require('vuex');
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(VueRouter,Vuex,BootstrapVue,IconsPlugin)

require('./../components/client')

const store = require('./store/client').store
const routes = require('./routes/client').routes

_.forEach(require('./filters').clientFilters,(fn,fl) => Vue.filter(fl,fn))

const router = new VueRouter({ routes })
Vue.mixin({ methods: { $post(item,action,data){ return new Promise(resolve => this.$store.dispatch('SERVER/post',{ item,action,data }).then(resolve)) } } });
const app = new Vue({
    router,store,
    el: '#application',
    data: {
        APP, LOGOUT
    },
    mounted(){
        let dispatch = this.$store.dispatch, required_fields = {
            'edition': ['id','name','description','active','amount_multiplier'],
            'order': ['amount','attributes','date','id','link','status','status_log','type','company','payment'],
            'payment': ['amount','attachment','date','id','order'],
            'company': ['active','company','domain','id','setup','created_at'],
        };
        let EDITIONS = [],COMPANIES = [],ORDERS = [],PAYMENTS = [],SUBSCRIPTIONS = [];
        _.forEach(DATA_COMPANIES,company => {
            _.forEach(company.subscriptions,subscription => SUBSCRIPTIONS.push(subscription))
            if(!_.isEmpty(company.orders)) _.forEach(company.orders,order => {
                if(order.payment) {
                    PAYMENTS.push(_.pick(order.payment,required_fields.payment));
                    Vue.set(order,'payment',order.payment.id);
                }
                ORDERS.push(_.pick(order, required_fields.order))
            })
            COMPANIES.push(_.pick(company,required_fields.company));

            dispatch('COMPANIES/serve_fetch',{ data:COMPANIES });
            dispatch('ORDERS/serve_fetch',{ data:ORDERS }); dispatch('PAYMENTS/serve_fetch',{ data:PAYMENTS });
            dispatch('SUBSCRIPTIONS/serve_fetch',{ data:SUBSCRIPTIONS });
        })
        _.forEach(DATA_EDITIONS,edition => EDITIONS.push(_.pick(edition,required_fields.edition)))
        dispatch('EDITIONS/serve_fetch',{ data:EDITIONS });
    }
});
