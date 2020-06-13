import Vuex from "vuex";

export const store = new Vuex.Store({
    modules: {
        SERVER: require('./modules/vendor').default,
        PROFILE: require('./modules/profile').default,
        COMPANIES: require('./modules/companies').default,
        SUBSCRIPTIONS: require('./modules/subscriptions').default,
        ORDERS: require('./modules/orders').default,
        EDITIONS: require('./modules/editions').default,
        PAYMENTS: require('./modules/payments').default,
    },
})