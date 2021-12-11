import Vue from 'vue'
import formData from "assets/formData";

const state = {
    CUSTOMERS, GROUPS,
    url: {
        login: '/user/login',
        logout: '/user/logout',
        update: '/user/update',
        live: '/admin/live/customers',
        fetch: '/admin/customer/fetch',
        create: '/admin/customer/create',
        admin_update: '/admin/customer/update',
        address: '/admin/customer/address',
        group: '/admin/customer/group',
        groups: '/admin/customer/groups',
    },
    live: [],
    interval: 13000,
    live_seconds: 5*60,
    fetch: null,
}

const getters = {
    customer({ CUSTOMERS }){ return (id) => _.head(_.filter(CUSTOMERS,['id',_.toInteger(id)])) },
    index(state){ return _(state.CUSTOMERS).map(({ id }) => _.toInteger(id)).invert().value() },
    live({ live,CUSTOMERS }){ return _(CUSTOMERS).pickBy(({ id }) => _.includes(live,_.toInteger(id))).sortBy(({ live }) => _.toInteger(live)).reverse().value() },
    addresses({ CUSTOMERS }){ return _(CUSTOMERS).keyBy('id').mapValues('address').value() },
    address({ CUSTOMERS }){ return _.keyBy(_.flatMap(CUSTOMERS,'address'),'id') },
    groups({ GROUPS }){ return (customer) => _(GROUPS).filter(({ customers }) => _.includes(customers,_.toSafeInteger(customer))).map(({id}) => _.toSafeInteger(id)).value() },
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
    },
    group(state,data){
      if(!data) return;
      let group = _.find(state.GROUPS,['id',data.id]); if(!group) state.GROUPS.push(data);
      _.forEach(data,(val,key) => (_.has(group,key) && key !== 'id') ? Vue.set(group,key,val) : null)
    },
    groups(state, { groups,customer }){
      customer = _.toSafeInteger(customer);
      _.forEach(state.GROUPS,Group => {
        let customers = Group.customers, group = Group.id;
        if(_.includes(customers,customer) && !_.includes(groups,group)) Group.customers = _.difference(customers,[customer]);
        if(!_.includes(customers,customer) && _.includes(groups,group)) Group.customers.push(customer);
      })
    }
}

const actions = {
    init({ commit,dispatch }){ commit('fetch',_.debounce(_.bind(dispatch,null,'fetch'),3500,{ leading:true })); /*dispatch('live');*/ },
    live({ state,commit,dispatch }){ $.post(state.url.live).then(function({ data }){ commit('live',data) }).catch(() => null).then(() => setTimeout((dispatch) => dispatch('live'),state.interval,dispatch)) },
    fetch({ state,commit },id){
      return new Promise(resolve => $.post(state.url.fetch,formData.obj({id})).then(function({ data }){ commit('replace',data); resolve(data); }))
    },
    create({ state,commit },data){
      return new Promise(resolve => $.post(state.url.create,data).then(({ data }) => { commit('replace',data); resolve(data); }))
    },
    update({ state,commit },data){
      return new Promise(resolve => $.post(state.url.admin_update,data).then(function({ data }){ commit('replace',data); resolve(data); }))
    },
    address({ state,commit },data){
      return new Promise(resolve => $.post(state.url.address,formData.obj(data)).then(function({ data }){ commit('replace',data); resolve(data); }))
    },
    group({ state,commit },data){
      return new Promise(resolve => $.post(state.url.group,formData.obj(data)).then(function({ data }){ commit('group',data); resolve(data); }))
    },
    groups({ state,commit },data){
      return new Promise(resolve => $.post(state.url.groups,formData.obj(data)).then(function({ data }){
        if(!data || !_.isArray(data)) return ;
        _.forEach(data,group => commit('group',group)); resolve(data) }))
    }
}

export default {
    state, getters, mutations, actions, namespaced: true
}
