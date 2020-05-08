
const state = {
    CATEGORIES,CATEGORY_ITEMS
}
const getters = {
}
const mutations = {

    update(state,data){
        let { id } = data;
        Vue.set(state.CATEGORIES,id,data)
    }

}
const actions = {

}

export default {
    state, getters, mutations, actions, namespaced: true
}
