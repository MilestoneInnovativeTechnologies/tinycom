
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
    live: [],
    interval: 13000,
    live_seconds: 5*60,
    fetch: null,
}

const getters = {
    customer({ CUSTOMERS }){ return (id) => _.head(_.filter(CUSTOMERS,['id',_.toInteger(id)])) },
    index(state){ return _(state.CUSTOMERS).map(({ id }) => _.toInteger(id)).invert().value() },
    live({ live,CUSTOMERS }){ return _(CUSTOMERS).pickBy(({ id }) => _.includes(live,_.toInteger(id))).sortBy(({ live }) => _.toInteger(live)).reverse().value() }
}

const mutations = {
    fetch(state,fn){ Vue.set(state,'fetch',fn) },
    live(state,data){
        state.live.splice(0,state.live.length); state.live.push(..._.keys(data));
        _.forEach(data,(time,customer) => {
            time = _.toInteger(time); customer = _.toInteger(customer);
            if(time+state.live_seconds < (new Date().getTime()/1000)){
                let idx = _.indexOf(state.live,customer);
                if(idx > -1) state.live.splice(idx,1);
            } else {
                let idx = _.findIndex(state.CUSTOMERS,['id',customer]); if(idx === -1) return state.fetch(customer);
                Vue.set(state.CUSTOMERS[idx],'live',time);
                if(!_.includes(state.live,customer)) state.live.push(customer);
            }
        });
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
