
const state = {
    live: {
        customers: {},
        carts: {},
    },
    url: {
        live_customers: '/admin/live/customers',
        live_carts: '/admin/live/carts',
    },
    interval: {
        live_customers: 25000,
        live_carts: 35000,
    }
}
const getters = {
    live_customers({ live: { customers } },g,rs,rootGetters){
        return _.map(customers,(time,customer) => _.zipObject(['customer','time','name','last_updated'],[customer,time,_.get(rootGetters["CUSTOMERS/customer"](customer),'name'),fromNow(time)]))
    }
}
const mutations = {
    setSync(state,data){
        _.forEach(data,(fn,key) => Vue.set(state.sync,key,fn));
    },
    liveCustomers(state,data){
        _.forEach(data,(time,customer) => _.has(state.live.customers,_.toInteger(customer))
            ? Vue.set(state.live.customers,_.toInteger(customer),_.toInteger(time))
            : (state.live.customers = Object.assign({},state.live.customers,_.set({},_.toInteger(customer),_.toInteger(time))))
        );
    }
}
const actions = {
    init({ dispatch,commit,state }){
        let customer_sync = _.bind(dispatch,null,'fetchLiveCustomers'); customer_sync(); setInterval(customer_sync,state.interval.live_customers);
        let cart_sync = _.bind(dispatch,null,'fetchLiveCustomers'); customer_sync(); setInterval(customer_sync,state.interval.live_customers);
    },
    fetchLiveCustomers({ state,commit }){ $.post(state.url.live_customers,function(R){ commit('liveCustomers',R) }) },
}


export default {
    state, getters, mutations, actions, namespaced: true
}
