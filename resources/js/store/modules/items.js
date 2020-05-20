
const state = {
    ITEMS,ITEM_CATEGORIES,
    toNumber: ['price','selling','stock'],
    stock_warn_limit: 5,
    last: null,
    url: {
        sync: '/item/sync',
        create: '/admin/item/create',
        fetch: '/admin/item/fetch',
    },
    timeout: 3*60*1000,
    fetch: null,
}
const getters = {
    all({ ITEMS,toNumber },{ isOnSale,sellPrice,image,isExclusive,left }){
        return _.mapValues(ITEMS,item => {
            return Object.assign({},item,{
                isOnSale:isOnSale(item.id), sellPrice:sellPrice(item.id), image:image(item.id), isExclusive:isExclusive(item.id),
                left:_.get(left,item.id)
            },_.zipObject(toNumber,_.map(toNumber,key => _.toNumber(_.get(item,key)))))
        })
    },
    item(s,{ all }){
        return (id) => _.get(all,_.toInteger(id),_.get(all,id,null))
    },
    left({ ITEMS },g, { CART }){
        let stock = _(ITEMS).keyBy(({ id }) => _.toInteger(id)).mapValues(({ stock }) => _.toNumber(stock)).value();
        let cart = CART ? _(CART.items).keyBy(({ item }) => _.toInteger(item)).mapValues(({ quantity }) => _.toInteger(quantity)).value() : {};
        return _.mapValues(stock,(qty,itm) => qty - _.get(cart,itm,0));
    },
    image({ ITEMS }){
        return (iId) => {
            let { media } = _.get(ITEMS,iId), item_media = (!media || _.isEmpty(media)) ? null : media[0];
            return (item_media) ? imageUrl(item_media) : null;
        }
    },
    isOnSale({ ITEMS }){
        return (id) => {
            let { price,selling } = _.get(ITEMS,id);
            price = _.toNumber(price); selling = _.toNumber(selling);
            return selling !== 0 && selling !== price && selling < price
        }
    },
    isExclusive(s,g,rs,rootGetters){ return rootGetters["SOURCE/has"] || (() => false) },
    exclusivePrice(s,g,rs,rootGetters){ return rootGetters["SOURCE/get"] || (() => null)  },
    sellPrice({ ITEMS },{ isOnSale,isExclusive,exclusivePrice }){
        return (id) => {
            let item = ITEMS[id]
            let price = isExclusive(id) ? exclusivePrice(id) : (isOnSale(id) ? _.get(item,'selling') : _.get(item,'price'));
            return _.toNumber(price);
        }
    },
    getLast({ ITEMS,last }){ return last || _.maxBy(ITEMS,({ updated_at }) => new Date(updated_at).getTime()); },
    getLatest({ ITEMS }){
        let sorted = _(ITEMS).sortBy(({ updated_at }) => new Date(updated_at).getTime()).map('id').value(), length = sorted.length;
        return (count) => count ? sorted.slice(length - _.toInteger(count),length) : sorted
    },
    slugs({ ITEMS }){ return _.mapValues(ITEMS,({ name,description }) => _.toLower(name) + ' ' + _.toLower(description)) }
}
const mutations = {
    fetch(state,fn){ Vue.set(state,'fetch',fn) },
    update(state,data){
        if(!data || !data.id) return;
        let id = _.toInteger(data.id);
        Vue.set(state.ITEMS,id,data);
        if(data.categories && !_.isEmpty(data.categories)){
            let c_ids = _.map(data.categories,({ id }) => _.toInteger(id));
            Vue.set(state.ITEM_CATEGORIES,id,c_ids);
        }
    },
    setLast(state,item){
        Vue.set(state,'last',item)
    },
    add(state,data){
        if(!data || !data.id) return;
        Vue.set(state.ITEMS,_.toInteger(data.id),data);
        let categories = _.get(data,'categories'); if(_.isEmpty(categories)) return; let item_categories = _.map(categories,({ id }) => _.toInteger(id));
        let item = _.toInteger(data.id)
        return _.has(state.ITEM_CATEGORIES,item) ? state.ITEM_CATEGORIES[item].push(...item_categories) : Vue.set(state.ITEM_CATEGORIES,item,item_categories);
    }
}
const actions = {
    init({ state,dispatch,commit }){
        commit('fetch',_.debounce(_.bind(dispatch,null,'fetch'),3500,{ leading:true }));
        setTimeout(() => setTimeout((dispatch) => dispatch('sync'),state.timeout,dispatch))
    },
    fetch({ state,commit },id){ $.post(state.url.fetch,{ id },function(item){ if(item && item.id) commit('replace',item); }) },
    sync({ state,dispatch,commit }){
        $.post(state.url.sync,function(R){
            if(R && R.length){ _.forEach(R,item => commit('update',item)) }
        }).always(() => setTimeout((dispatch) => dispatch('sync'),state.timeout,dispatch))
    },
    create({ state,commit },data){
        return new Promise(resolve => $.ajax({ url:state.url.create, data, type: "POST",enctype: 'multipart/form-data', processData: false, contentType: false, success: function(R){ commit('add',R); resolve(R) }}))
    },
    update({ commit,state },item){
        if(!item || !item.id) return; let item_id = _.toInteger(item.id), categories = state.ITEM_CATEGORIES[item_id];
        _.forEach(categories,category => commit('CATEGORIES/removeItem',{ item:item_id,category },{ root:true }));
        commit('update',item);
        if(item.categories && !_.isEmpty(item.categories)){
            let categories = _.map(item.categories,({ id }) => _.toInteger(id));
            _.forEach(categories,category => commit('CATEGORIES/addItem',{ item:item_id,category },{ root:true }))
        }
    }
}

export default {
    state, getters, mutations, actions, namespaced: true
}
