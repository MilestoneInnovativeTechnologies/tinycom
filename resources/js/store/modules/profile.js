
const state = {
    USER
}
const getters = {
    name({ USER }){ return _.get(USER,'name') },
    email({ USER }){ return _.get(USER,'email') },
    phone({ USER }){ return _.get(USER,'phone') },
}
const mutations = {
    serve_update(state, { error,data }){ if(!error) ['name','email'].forEach(key => _.has(data,key) ? Vue.set(state.USER,key,data[key]) : null) }
}
const actions = {
}

export default {
    state, getters, mutations, actions, namespaced: true
}
