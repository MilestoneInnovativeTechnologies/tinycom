
const state = {
    CARTS,
    recent_seconds: 6*60*60,
    non_source_name: 'DIRECT',
    url: {
        confirm: '/admin/cart/confirm',
        cancel: '/admin/cart/cancel',
        live: '/admin/live/carts',
    },
    live: {},
    live_sync: 45000,
}

const getters = {
    all({ CARTS,non_source_name },g,rs,rootGetters){ return _.values(_.mapValues(CARTS,cart => {
        return _.assign(cart,{
            customer_name: cart.customer ? _.get(rootGetters['CUSTOMERS/customer'](cart.customer),'name') : '',
            customer_phone: cart.customer ? _.get(rootGetters['CUSTOMERS/customer'](cart.customer),'phone') : '',
            source_title: cart.source ? _.get(rootGetters['SOURCES/source'](cart.source),'title') : non_source_name,
            updated: fromNow(cart.time),
        });
    })) },
    recent({ recent_seconds },{ all }){ return _.filter(all,({ time }) => _.toInteger(time) > (timeNow() - recent_seconds)) },
    cart(s, { all }){ return (id) => _.head(_.filter(all,['id',id])) },
    live({ live },g,rs,rootGetters){
        return _.map(live,({ id,uuid,customer,amount,items,time,source }) => _.zipObject(['id','uuid','customer','amount','items','time','source','title','name','phone','updated'],[
            id,uuid,customer,amount || 0,items || [],time,source,
            _.get(rootGetters["SOURCES/source"](source),'title'),
            _.get(rootGetters["CUSTOMERS/customer"](customer),'name'),
            _.get(rootGetters["CUSTOMERS/customer"](customer),'phone'),
            fromNow(time)
        ]))
    }
}

const mutations = {
    replace(state,cart){
        let id = _.toInteger(cart.id), idx = _.findIndex(state.CARTS,['id',id]);
        state.CARTS.splice(idx,1); state.CARTS.push(cart);
    },
    live(state,carts){
        _.forEach(carts,(details,uuid) => {
            if(!_.has(state.live,uuid)) Vue.set(state.live,uuid,{});
            Vue.set(state.live,uuid,details);
        })
    }
}

const actions = {
    confirm({ state,commit },id) {
        return new Promise(resolve => {
            $.post(state.url.confirm,{ id },function(R){
                if(!R.error) commit('replace',R.cart);
                resolve(R);
            })
        })
    },
    cancel({ state,commit },data) {
        return new Promise(resolve => {
            $.post(state.url.cancel,data,function(R){
                if(!R.error) commit('replace',R.cart);
                resolve(R);
            })
        })
    },
    live({ state,commit,dispatch }){
        $.post(state.url.live,function(R){
            commit('live',R);
            setTimeout((dispatch) => dispatch('live'),state.live_sync,dispatch)
        })
    }
}

export default {
    state, getters, mutations, actions, namespaced: true
}
