import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      CATEGORIES: require('./modules/categories').default,
      ITEMS: require('./modules/items').default,
      BUNDLES: require('./modules/bundles').default,
      CART: require('./modules/cart').default,
      USER: require('./modules/user').default,
      SOURCE: require('./modules/source').default,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
