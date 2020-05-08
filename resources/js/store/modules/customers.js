
const state = {
    CUSTOMERS,
    url: {
        login: '/user/login',
        logout: '/user/logout',
        update: '/user/update'
    },
}

const getters = {
    customer({ CUSTOMERS }){ return (id) => _.head(_.filter(CUSTOMERS,['id',_.toInteger(id)])) }
}

const mutations = {

}

const actions = {


}

export default {
    state, getters, mutations, actions, namespaced: true
}
