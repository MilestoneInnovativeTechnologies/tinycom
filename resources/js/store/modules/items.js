
const state = {
    ITEMS,ITEM_CATEGORIES,
    toNumber: ['price','selling','stock'],
    last: null,
    url: {
        sync: '/item/sync',
        create: '/admin/item/create'
    },
    timeout: 180000,
}
const getters = {
    all({ ITEMS,toNumber },{ isOnSale,sellPrice,image,isExclusive }){
        return _.mapValues(ITEMS,item => {
            return Object.assign({},item,{
                isOnSale:isOnSale(item.id), sellPrice:sellPrice(item.id), image:image(item.id), isExclusive:isExclusive(item.id)
            },_.zipObject(toNumber,_.map(toNumber,key => _.toNumber(_.get(item,key)))))
        })
    },
    item(s,{ all }){
        return (id) => _.get(all,_.toInteger(id),_.get(all,id,null))
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
    isExclusive(s,g,rs,rootGetters){ return rootGetters["SOURCE/has"] },
    exclusivePrice(s,g,rs,rootGetters){ return rootGetters["SOURCE/get"] },
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
    update(state,data){
        let { id } = data;
        Vue.set(state.ITEMS,id,data)
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
    sync({ getters,state,dispatch,commit }){
        $.post(state.url.sync,{ updated_at:_.get(getters,['getLast','updated_at']) },function(R){
            if(R && R.length){
                _.forEach(R,item => Vue.set(state.ITEMS,_.toNumber(item.id),item));
                commit('setLast',_.maxBy(R,item => ({ updated_at }) => new Date(updated_at).getTime()));
            }
            setTimeout((dispatch) => dispatch('sync'),state.timeout,dispatch);
        })
    },
    create({ state,commit },data){
        return new Promise(resolve => $.ajax({ url:state.url.create, data, type: "POST",enctype: 'multipart/form-data', processData: false, contentType: false, success: function(R){ commit('add',R); resolve(R) }}))
    }
}

export default {
    state, getters, mutations, actions, namespaced: true
}
