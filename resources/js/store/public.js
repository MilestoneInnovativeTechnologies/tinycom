import Vuex from 'vuex'

export const store = new Vuex.Store({
    modules: {
        CATEGORIES: require('./modules/categories').default,
        ITEMS: require('./modules/items').default,
        BUNDLES: require('./modules/bundles').default,
        CART: require('./modules/cart').default,
        USER: require('./modules/user').default,
        MISC: require('./modules/misc').default,
        SOURCE: require('./modules/source').default,
    },
})
