
const state = {
    SOURCE,
    url: {
        fetch: '/source/fetch'
    }
}

const getters = {
    has({ SOURCE: { items } }){ return (id) => id ? _.has(items,id) : items.length },
    get({ SOURCE: { items } }){ return (id) => _.get(items,id,null) },
}

const mutations = {
    setSource(state,{ uuid,items }){
        Vue.set(state.SOURCE,'uuid',uuid);
        Vue.set(state.SOURCE,'items',{});
        _.forEach(items,(price,item) => Vue.set(state.SOURCE.items,_.toNumber(item),_.toNumber(price)))
    }
}

const actions = {

    fetch({ state,commit }){
        $.post(state.url.fetch,function(R){
            if(R) commit('setSource',R)
        })
    }
}

export default {
    state, getters, mutations, actions, namespaced: true
}
