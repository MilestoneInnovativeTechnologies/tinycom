
const state = {
    CUSTOMERS,
    url: {
        login: '/user/login',
        logout: '/user/logout',
        update: '/user/update',
        live: '/admin/live/customers',
        fetch: '/admin/customer/fetch',
        create: '/admin/customer/create',
        admin_update: '/admin/customer/update',
    },
    live: {},
    interval: 13000,
    fetch: null,
}

const getters = {
    customer({ CUSTOMERS }){ return (id) => _.head(_.filter(CUSTOMERS,['id',_.toInteger(id)])) },
    live({ live }){ return _.reverse(_.sortBy(live,'time')) }
}

const mutations = {
    fetch(state,fn){ Vue.set(state,'fetch',fn) },
    live(state,data){
        _.forEach(data,(time,customer) => {
            time = _.toInteger(time); customer = _.toInteger(customer); let updated = fromNow(time) + ' ago';
            if(_.has(state.live,customer)) return Object.assign(state.live[customer],{ time:time },{ updated:fromNow(time) });
            let idx = _.findIndex(state.CUSTOMERS,['id',customer]); if(idx === -1) return state.fetch(customer);
            let { name,phone } = state.CUSTOMERS[idx];
            Vue.set(state.live,customer,{ customer,time,updated,name,phone });
        });
        _.forEach(_.difference(_.keys(state.live),_.keys(data)),customer => Vue.delete(state.live,customer));
    },
    replace(state,data){
        let id = _.get(data,'id',null); if(!id) return; id = _.toInteger(id);
        let idx = _.findIndex(state.CUSTOMERS,['id',id]); if(idx >= 0) state.CUSTOMERS.splice(idx,1);
        state.CUSTOMERS.push(data);
    }
}

const actions = {
    init({ commit,dispatch }){ commit('fetch',_.debounce(_.bind(dispatch,null,'fetch'),3500,{ leading:true })); dispatch('live'); },
    live({ state,commit,dispatch }){ $.post(state.url.live,function(R){ commit('live',R) }).always(() => setTimeout((dispatch) => dispatch('live'),state.interval,dispatch)) },
    fetch({ state,commit },id){ $.post(state.url.fetch,{ id },function(R){ commit('replace',R); }); },
    create({ state,commit },data){ $.post(state.url.create,data,function(R){ commit('replace',R); }); },
    update({ state,commit },data){ $.post(state.url.admin_update,data,function(R){ commit('replace',R); }); },
}

export default {
    state, getters, mutations, actions, namespaced: true
}
