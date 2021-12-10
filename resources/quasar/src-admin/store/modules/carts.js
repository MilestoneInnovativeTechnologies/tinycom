import Vue from 'vue';
import formData from "assets/formData";

const state = {
    CARTS,
    recent_seconds: 6*60*60,
    non_source_name: 'DIRECT',
    url: {
        confirm: '/admin/cart/confirm',
        delivered: '/admin/cart/delivered',
        cancel: '/admin/cart/cancel',
        orders: '/admin/cart/orders',
        live: '/admin/live/carts',
        fetch: '/admin/cart/fetch'
    },
    live: {},
    interval: {
        live: 30000,
        orders: 15000
    },
    expire: {
        live: 5*60
    },
    fetch: null
}

const getters = {
    all({ CARTS,non_source_name },g,rs,rootGetters){ return _.values(_.mapValues(CARTS,cart => {
        return _.assign({},cart,{
            customer_name: cart.customer ? _.get(rootGetters['CUSTOMERS/customer'](cart.customer),'name') : '',
            customer_phone: cart.customer ? _.get(rootGetters['CUSTOMERS/customer'](cart.customer),'phone') : '',
            source_title: cart.source ? _.get(rootGetters['SOURCES/source'](cart.source),'title') : non_source_name,
            updated: fromNow(cart.time),
            total: _.sumBy(cart.items || [],({ amount }) => _.toNumber(amount)),
            amount: _.toNumber(cart.amount || 0),
            address_text: _.get(rootGetters["CUSTOMERS/address"],[cart.address,'address'],'')
        });
    })) },
    recent({ recent_seconds },{ all }){ return _.filter(all,({ time }) => _.toInteger(time) > (timeNow() - recent_seconds)) },
    cart(state, { all }){ return (id) => _.head(_.filter(all,['id',id])) || state.fetch(id) },
    live({ live },g,rs,rootGetters){
        return _.map(live,({ id,uuid,customer,items,time,source,amount,address,note }) => _.zipObject(['id','uuid','customer','items','time','source','address','total','amount','source_id','title','name','phone','updated','customer_name','customer_phone','status','address_text'],[
            id,uuid,customer,items || [],time,source,address,note,
            _.sumBy(items || [],({ amount }) => _.toNumber(amount)),
            _.toNumber(amount || 0),
            _.get(rootGetters["SOURCES/source2"](source),'id'),
            _.get(rootGetters["SOURCES/source2"](source),'title'),
            _.get(rootGetters["CUSTOMERS/customer"](customer),'name'),
            _.get(rootGetters["CUSTOMERS/customer"](customer),'phone'),
            fromNow(time),
            _.get(rootGetters["CUSTOMERS/customer"](customer),'name'),
            _.get(rootGetters["CUSTOMERS/customer"](customer),'phone'),
            'live',
            _.get(rootGetters["CUSTOMERS/address"],[address,'address'],'')
        ]))
    }
}

const mutations = {
    replace(state,cart){
        let id = _.toInteger(cart.id), idx = _.findIndex(state.CARTS,['id',id]);
        if(idx > -1) state.CARTS.splice(idx,1); state.CARTS.push(cart);
    },
    live(state,carts){
        _.forEach(carts,(details,uuid) => {
            if(!_.has(state.live,uuid)) Vue.set(state.live,uuid,{});
            Vue.set(state.live,uuid,details);
        })
        _.forEach(_.difference(_.keys(state.live),_.map(carts,({ time,uuid }) => ((time + state.expire.live) < timeNow()) ? null : uuid)),cart => Vue.delete(state.live,cart));
    },
    ordered(state,carts){
        if(!carts || _.isEmpty(carts)) return;
        _.forEach(carts,id => {
            let idx = _.findIndex(state.CARTS,['id',_.toInteger(id)]);
            if(idx >= 0 && state.CARTS[idx]['status'] === 'New') Vue.set(state.CARTS[idx],'status','Ordered');
            else if(idx < 0 || _.isEmpty(state.CARTS[idx].items)) state.fetch(id);
        });
    },
    fetch(state,fn){ Vue.set(state,'fetch',fn) }
}

const actions = {
    init({ dispatch,commit }){ commit('fetch',_.debounce(_.bind(dispatch,null,'fetch'),3500,{ leading:true })); dispatch('live'); },
    fetch({ state,commit },id){ $.post(state.url.fetch,formData.obj({id})).then(function({ data }){ if(data && data.id) commit('replace',data); }) },
    confirm({ state,commit },id) { return new Promise(resolve => { $.post(state.url.confirm,formData.obj({id})).then(function({ data }){ if(!data.error) commit('replace',data.cart); resolve(data); }) }) },
    delivered({ state,commit },data) { return new Promise(resolve => { $.post(state.url.delivered,data).then(function({ data }){ if(!data.error) commit('replace',data.cart); resolve(data); }) }) },
    cancel({ state,commit },data) { return new Promise(resolve => { $.post(state.url.cancel,data).then(function({ data }){ if(!data.error) commit('replace',data.cart); resolve(data); }) }) },
    orders({ state,commit,dispatch }){ $.post(state.url.orders).then(function({ data }){ commit('ordered',data) }).catch(() => null).then(() => setTimeout((dispatch) => dispatch('orders'),state.interval.orders,dispatch)) },
    live({ state,commit,dispatch }){ $.post(state.url.live).then(function({ data }){ commit('live',data);commit('CUSTOMERS/live',customers(data),{ root:true }); }).catch(() => null).then(() => setTimeout((dispatch) => dispatch('live'),state.interval.live,dispatch)) },
}

export default {
    state, getters, mutations, actions, namespaced: true
}

function customers(carts){
  return _(carts).filter('customer').mapKeys('customer').mapValues('time').value()
}
