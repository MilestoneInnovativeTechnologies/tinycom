
const state = {
    DATA: [],
}
const getters = {
    index({ DATA }){ return _(DATA).map('id').invert().mapValues(_.toInteger).value() },
    order({ DATA }){ return _(DATA).keyBy('order').value() },
}
const mutations = {
    add(state,data){ state.DATA.unshift(data) },
    update(state,{ data,index }){ Vue.set(state.DATA,index,data) },
}
const actions = {
    serve_create({ getters,commit },{ data }){ let index = _.get(getters.index,data.id,null); return index !== null ? commit('update',{ data,index }) : commit('add',data) },
    serve_fetch({ dispatch },{ data }){ _(data).forEach(payment => dispatch('serve_create',{ data:payment })) },
    serve_manual({ dispatch },{ data }) { dispatch('serve_create', {data}); dispatch('ORDERS/paid', data.order, {root: true}) }
}

export default {
    state, getters, mutations, actions, namespaced: true
}
