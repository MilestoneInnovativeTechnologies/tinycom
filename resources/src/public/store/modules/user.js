
const state = {
    USER,
    url: {
        login: '/user/login',
        logout: '/user/logout',
        update: '/user/update'
    },
}

const getters = {
}

const mutations = {
    setUser(state,{ id,name,phone }){ state.USER = Object.assign({},state.USER,{ id,name,phone }); },
    delUser(state){ state.USER = null; }
}

const actions = {

    login({ state,commit,dispatch },data){
      return new Promise(resolve => {
        $.post(state.url.login,data).then(({ data }) => { commit('setUser',data); dispatch('SOURCE/fetch',null,{ root:true }); resolve(data); })
      })
    },
    logout({ state,commit }){ $.post(state.url.logout).then((R) => commit('delUser')) },
    update({ state,commit },data){
        return new Promise(resolve => {
            $.post(state.url.update,data).then(({ data }) => { if(!_.isString(data)) commit('setUser',data); resolve(data); })
        })
    },

}

export default {
    state, getters, mutations, actions, namespaced: true
}
