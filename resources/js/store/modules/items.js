
const state = {
    ITEMS,ITEM_CATEGORIES,
    image_url: '/uploads/media/[id]/[file_name]',
    toNumber: ['price','selling','stock'],
    last: null,
    url: {
        sync: '/item/sync'
    },
    timeout: 60000,
}
const getters = {
    item({ ITEMS,toNumber },{ isOnSale,sellPrice,image,isExclusive }){
        return (id) => Object.assign({},_.get(ITEMS,id)
            ,{ isOnSale:isOnSale(id), sellPrice:sellPrice(id), image:image(id), isExclusive:isExclusive(id) }
            , _.zipObject(toNumber,_.map(toNumber,key => _.toNumber(_.get(ITEMS,[id,key]))))
            )
    },
    image({ ITEMS,image_url }){
        return (iId) => {
            let { media } = _.get(ITEMS,iId); if(!media || _.isEmpty(media)) return  null; let { id,file_name } = media[0];
            return (id) ? image_url.replace(/\[(\w+)?\]/g,function(f,i){ return eval(i) }) : null
        }
    },
    isOnSale({ ITEMS }){
        return (id) => {
            let { price,selling } = _.get(ITEMS,id);
            price = _.toNumber(price); selling = _.toNumber(selling);
            return !!selling && price !== selling;
        }
    },
    isExclusive(s,g,rs,rootGetters){ return rootGetters["SOURCE/has"] },
    exclusivePrice(s,g,rs,rootGetters){ return rootGetters["SOURCE/get"] },
    sellPrice({ ITEMS },{ isOnSale,isExclusive,exclusivePrice }){
        return (id) => {
            let item = ITEMS[id]
            let price = isExclusive(id) ? exclusivePrice(id) : (isOnSale(id) ? _.get(item,'selling') : _.get(item,'selling'));
            return _.toNumber(price);
        }
    },
    getLast({ ITEMS,last }){ return last || _.maxBy(ITEMS,({ updated_at }) => new Date(updated_at).getTime()); },
    getLatest({ ITEMS }){
        let sorted = _(ITEMS).sortBy(({ updated_at }) => new Date(updated_at).getTime()).map('id').value(), length = sorted.length;
        return (count) => sorted.slice(length - _.toInteger(count),length)
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
    }
}

export default {
    state, getters, mutations, actions, namespaced: true
}
