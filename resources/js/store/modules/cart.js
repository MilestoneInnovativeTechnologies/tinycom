
const state = {
    uuid: '',
    items: [],
    url: {
        sync: '/cart/sync',
        order: '/cart/order',
    },
    sync: null,
    timeout: 45000,
    ordered: {
        status: false,
        error: null,
        message: ''
    }

}
const getters = {
    itemQuantity({ items }){ return (item) => _.get(_.find(items,['item',_.toInteger(item)]),'quantity',0) },
    itemTotal({ items }){ return (item) => _.get(_.find(items,['item',_.toInteger(item)]),'amount',0) },
    total({ items }){ return _.sumBy(items,'amount') },
    itemsCount({ items }){ return items.length },
    images(state,{ details }){ return _(details).map('image').filter().value() },
    details({ items },g,rs,rootGetters){ return _(items).keyBy(({ item }) => _.toInteger(item)).mapValues(({ item }) => rootGetters['ITEMS/item'](_.toInteger(item))).value() },
}

const mutations = {
    init(state,uuid){ Vue.set(state,'uuid',uuid); },
    setSync(state,sync){ Vue.set(state,'sync',sync); },
    addItem(state,details){ state.items.push(details); },
    removeItem(state,item){ let items_index = _.findIndex(state.items,['item',item]); state.items.splice(items_index,1); },
    incrementByIndex(state,idx){ let { price } = state.items[idx]; let quantity = ++ state.items[idx].quantity; state.items[idx].amount = price * quantity },
    decrementByIndex(state,idx){ let { price } = state.items[idx]; let quantity = -- state.items[idx].quantity; state.items[idx].amount = price * quantity },
    ordered(state){ state.ordered.status = true; state.ordered.error = null; },
    orderResponse(state,{ error,message }){ state.items.splice(0); state.uuid = ''; state.ordered.status = false; state.ordered.error = error; state.ordered.message = message; },
}
const actions = {
    init({ commit,dispatch,state:{ timeout } },data){
        let sync = _.debounce(_.bind(dispatch,this,'sync'),2000,{ trailing:true }); commit('setSync',sync); setTimeout(sync,timeout);
        if(!data ||_.isEmpty(data)) return;
        let { uuid,items } = data; commit('init',uuid);
        if(items && !_.isEmpty(items)) _.forEach(items,({ item,quantity }) => dispatch('addItemQuantity',{ item,quantity }))
    },
    addItem({ rootGetters,commit },item){
        let item_details = rootGetters['ITEMS/item'](item);
        let { id,sellPrice } = item_details; id = _.toInteger(id);
        commit('addItem',{ item:id,price:sellPrice,quantity:1,amount:sellPrice })
    },
    addItemQuantity({ rootGetters,commit }, { item,quantity }){
        let item_details = rootGetters['ITEMS/item'](item); let { id,sellPrice } = item_details;
        item = _.toInteger(id); quantity = _.toInteger(quantity);
        let price = sellPrice, amount = quantity * price;
        commit('addItem',{ item,price,quantity,amount })
    },
    increment({ state,dispatch,commit },item){ item = _.toInteger(item);
        let item_idx = _.findIndex(state.items,['item',item]);
        if(item_idx > -1) commit('incrementByIndex',item_idx)
        else dispatch('addItem',item); (state.sync)();
    },
    decrement({ state,commit },item){ item = _.toInteger(item);
        let idx = _.findIndex(state.items,['item',item]); if(idx === -1) return;
        if(state.items[idx].quantity <= 1) commit('removeItem',item);
        else commit('decrementByIndex',idx); (state.sync)();
    },
    sync({ state:{ url,items,uuid,sync,timeout },commit,dispatch }){
        $.post(url.sync, { items }, function(R){
            if(uuid !== R.uuid) commit('init',R.uuid);
            if(R.items && R.items.length !== items.length || _.sumBy(items,({quantity}) => _.toNumber(quantity)) !== _.sumBy(R.items,({quantity}) => _.toNumber(quantity))){
                _.forEach(items,({ item }) => commit('removeItem',_.toInteger(item)));
                _.forEach(R.items,({ item,quantity }) => { let qty = _.toNumber(quantity); while(qty-- >= 1) dispatch('increment',item); });
            }
            //setTimeout(sync,timeout)
        })
    },
    order({ state:{ url:{ order },items,uuid },commit }){
        commit('ordered');
        $.post(order, { items,uuid },function(R){
            commit('orderResponse',R);
        })
    }
}


export default {
    state, getters, mutations, actions, namespaced: true
}
