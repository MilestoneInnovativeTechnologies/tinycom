
const state = {
    DATA: [],
}
const getters = {
    index({ DATA }){ return _(DATA).map('id').invert().mapValues(_.toInteger).value() },
    companies({ DATA }){ return _.groupBy(DATA,'company') },
    expires({ DATA },{ companies }){ return _.mapValues(companies,subs => _.get(_(subs).sort(({ end }) => new Date(end).getTime()).reverse().first(),'end')) }
}
const mutations = {
    add(state,data){ state.DATA.push(data) },
    update(state,{ data,index }){ Vue.set(state.DATA,index,data) },
}
const actions = {
    serve_create({ getters,commit },{ data }){ let index = _.get(getters.index,data.id,null); return index !== null ? commit('update',{ data,index }) : commit('add',data) },
    serve_fetch({ dispatch },{ data }){ _(data).forEach(subscription => dispatch('serve_create',{ data:subscription })) },
    serve_all({ dispatch },response){ dispatch('serve_fetch',response) },
}

export default {
    state, getters, mutations, actions, namespaced: true
}
