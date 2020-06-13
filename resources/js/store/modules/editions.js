
const state = {
    DATA: [],
}
const getters = {
    index({ DATA }){ return _(DATA).map('id').invert().mapValues(_.toInteger).value() },
}
const mutations = {
    add(state,data){ state.DATA.push(data) },
    update(state,{ data,index }){ Vue.set(state.DATA,index,data) },
}
const actions = {
    serve_create({ getters,commit },{ data }){ let index = _.get(getters.index,data.id,null); return index !== null ? commit('update',{ data,index }) : commit('add',data) },
    serve_fetch({ dispatch },{ data }){ _(data).forEach(edition => dispatch('serve_create',{ data:edition })) },
}

export default {
    state, getters, mutations, actions, namespaced: true
}
