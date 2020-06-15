
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
window.axios.defaults.baseURL = '/referrer/server/';

window.Vue = require('vue');
window.Vuex = require('vuex');
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(VueRouter,Vuex,BootstrapVue,IconsPlugin)

require('./../components/referrer')

const store = require('./store/referrer').store
const routes = require('./routes/referrer').routes

_.forEach(require('./filters').referrerFilters,(fn,fl) => Vue.filter(fl,fn))

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
            'company': ['active','company','domain','id','setup','user','created_at'],
            'user': ['name','email','phone','id','created_at'],
        };
        let EDITIONS = [], CLIENTS = [],COMPANIES = [],ORDERS = [],PAYMENTS = [],SUBSCRIPTIONS = [];
        _.forEach(DATA,company => {
            _.forEach(company.subscriptions,subscription => {
                if(subscription.edition) {
                    EDITIONS.push(_.pick(subscription.edition,required_fields.edition))
                    Vue.set(subscription,'edition',subscription.edition.id);
                }
                SUBSCRIPTIONS.push(subscription)
            })

            if(!_.isEmpty(company.orders)) _.forEach(company.orders,order => {
                if(order.payment) {
                    PAYMENTS.push(_.pick(order.payment,required_fields.payment));
                    Vue.set(order,'payment',order.payment.id);
                }
                ORDERS.push(_.pick(order, required_fields.order))
            })

            if(company.user) {
                CLIENTS.push(_.pick(company.user,required_fields.user));
                Vue.set(company,'user',company.user.id);
            }
            COMPANIES.push(_.pick(company,required_fields.company));

            dispatch('EDITIONS/serve_fetch',{ data:EDITIONS }); dispatch('COMPANIES/serve_fetch',{ data:COMPANIES });
            dispatch('ORDERS/serve_fetch',{ data:ORDERS }); dispatch('PAYMENTS/serve_fetch',{ data:PAYMENTS });
            dispatch('SUBSCRIPTIONS/serve_fetch',{ data:SUBSCRIPTIONS });
            dispatch('CLIENTS/serve_fetch',{ data:CLIENTS });
        })
    }
});
