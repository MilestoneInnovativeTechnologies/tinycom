
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

    login({ state,commit,dispatch },data){ $.post(state.url.login,data,function(R){ commit('setUser',R); dispatch('SOURCE/fetch',null,{ root:true }) }) },
    logout({ state,commit }){ $.post(state.url.logout,function(R){ commit('delUser'); }) },
    update({ state,commit },data){
        return new Promise(resolve => {
            $.post(state.url.update,data,function(R){ if(!_.isString(R)) commit('setUser',R); resolve(R); })
        })
    },

}

export default {
    state, getters, mutations, actions, namespaced: true
}
