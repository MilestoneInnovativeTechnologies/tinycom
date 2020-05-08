import Vuex from "vuex";

export const store = new Vuex.Store({
    modules: {
        CATEGORIES: require('./modules/categories').default,
        ITEMS: require('./modules/items').default,
        BUNDLES: require('./modules/bundles').default,
        CARTS: require('./modules/carts').default,
        SERVER: require('./modules/server').default,
        CUSTOMERS: require('./modules/customers').default,
        SOURCES: require('./modules/sources').default,
        DASHBOARD: require('./modules/dashboard').default,
    },
})