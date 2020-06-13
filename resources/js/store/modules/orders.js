
const state = {
    DATA: [],
}
const getters = {
    index({ DATA }){ return _(DATA).map('id').invert().mapValues(_.toInteger).value() },
    companies({ DATA }){ return _.groupBy(DATA,'company') }
}
const mutations = {
    add(state,data){ state.DATA.unshift(data) },
    update(state,{ data,index }){ Vue.set(state.DATA,index,data) },
}
const actions = {
    serve_create({ getters,commit },{ data }){ let index = _.get(getters.index,data.id,null); return index !== null ? commit('update',{ data,index }) : commit('add',data) },
    serve_fetch({ dispatch },{ data }){ _(data).forEach(order => dispatch('serve_create',{ data:order })) },
    serve_cancel({ dispatch },{ data }){ dispatch('serve_create',{ data }) },
    paid({ commit,getters,state },order_id){ let index = getters.index[order_id], data = Object.assign({},state.DATA[index],_.set({},'status','Paid')); commit('update',{ data,index }) },
}

export default {
    state, getters, mutations, actions, namespaced: true
}
