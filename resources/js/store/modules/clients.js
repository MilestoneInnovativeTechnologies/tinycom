
const state = {
    CLIENTS: []
}
const getters = {
    index({ CLIENTS }){ return _(CLIENTS).map('id').invert().mapValues(_.toInteger).value() },
    companies(s,g,rootState){ return _.groupBy(rootState.COMPANIES.DATA,'user') },
}
const mutations = {
    add(state,data){ state.CLIENTS.push(data) },
    update(state,{ data,index }){ Vue.set(state.CLIENTS,index,data) },
}
const actions = {
    serve_create({ getters,commit },{ data }){ let index = _.get(getters.index,data.id,null); return index !== null ? commit('update',{ data,index }) : commit('add',data) },
    serve_fetch({ dispatch },{ data }){ _(data).forEach(client => dispatch('serve_create',{ data:client })) },
    serve_update({ dispatch },{ data,error }){ if(!error) dispatch('serve_create', { data }) },
}

export default {
    state, getters, mutations, actions, namespaced: true
}
