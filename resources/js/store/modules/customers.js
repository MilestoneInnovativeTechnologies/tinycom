
const state = {
    CUSTOMERS,
    url: {
        login: '/user/login',
        logout: '/user/logout',
        update: '/user/update',
        live: '/admin/live/customers',
    },
    live: {},
    interval: 10000
}

const getters = {
    customer({ CUSTOMERS }){ return (id) => _.head(_.filter(CUSTOMERS,['id',_.toInteger(id)])) },
    live({ live }){ return _.reverse(_.sortBy(live,'time')) }
}

const mutations = {
    live(state,data){
        _.forEach(data,(time,customer) => {
            time = _.toInteger(time); customer = _.toInteger(customer); let updated = fromNow(time) + ' ago';
            if(_.has(state.live,customer)) return Object.assign(state.live[customer],{ time:time },{ updated:fromNow(time) });
            let { name,phone } = _.get(_.filter(state.CUSTOMERS,['id',customer]),0,{});
            Vue.set(state.live,customer,{ customer,time,updated,name,phone });
        });
        _.forEach(_.difference(_.keys(state.live),_.keys(data)),customer => Vue.delete(state.live,customer));
    }

}

const actions = {
    live({ state,commit,dispatch }){
        $.post(state.url.live,function(R){
            commit('live',R);
            setTimeout((dispatch) => dispatch('live'),state.interval,dispatch)
        })
    }
}

export default {
    state, getters, mutations, actions, namespaced: true
}
