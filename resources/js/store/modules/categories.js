
const state = {
    CATEGORIES,CATEGORY_ITEMS,
    url: {
        create: '/admin/category/create'
    },
}
const getters = {
    items({ CATEGORY_ITEMS }){ return (category) => _.map(_.get(CATEGORY_ITEMS,_.toInteger(category),[]),_.toInteger) }
}
const mutations = {

    update(state,data){ let { id } = data; Vue.set(state.CATEGORIES,id,data) },
    add(state,data){ if(data && data.id) Vue.set(state.CATEGORIES,_.toInteger(data.id),data) },
    addItem(state,{ item,category }){
        item = _.toInteger(item); category = _.toInteger(category);
        return _.has(state.CATEGORY_ITEMS,category) ? state.CATEGORY_ITEMS[category].push(item) : Vue.set(state.CATEGORY_ITEMS,category,[item])
    },

}
const actions = {
    create({ state,commit },data){
        $.ajax({ url:state.url.create, data, type: "POST",enctype: 'multipart/form-data', processData: false, contentType: false, success: function(R){ commit('add',R) }})
    }
}

export default {
    state, getters, mutations, actions, namespaced: true
}
