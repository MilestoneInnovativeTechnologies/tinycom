import Vue from 'vue'

const state = {
    USER,
    url: {
        login: '/user/login',
        logout: '/user/logout',
        update: '/user/update',
        address: '/user/address',
    }
}

const getters = {
  ADDRESS({ USER }){ return _.keyBy(USER.address,'id') },
}

const mutations = {
    setUser(state,{ id,name,phone,address }){ state.USER = Object.assign({},state.USER,{ id,name,phone,address }); },
    delUser(state){ state.USER = null; },
    address(state,data){ let address = _.find(state.USER.address,['id',data.id]); _.forEach(data,(val,key) => key === 'id' ? null : address[key] = val) }
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
  address({ state,commit },data){
    return new Promise(resolve => {
      $.post(state.url.address,data).then(({ data }) => { if(!_.isString(data)) commit('setUser',data); resolve(data); })
    })
  }

}

export default {
    state, getters, mutations, actions, namespaced: true
}
