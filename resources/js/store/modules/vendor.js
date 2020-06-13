
const state = {
    module_map: {
        profile: 'PROFILE',
        client: 'CLIENTS',
        referrer: 'REFERRERS',
        company: 'COMPANIES',
        subscription: 'SUBSCRIPTIONS',
        order: 'ORDERS',
        edition: 'EDITIONS',
        payment: 'PAYMENTS',
    }
}
const getters = {
}
const mutations = {
}
const actions = {
    post({ dispatch,commit,state:{ module_map } },{ item,action,data }){
        return new Promise(((resolve, reject) => {
            let url = `${item}/${action}`;
            axios({ url,data,method:'post' })
                .then(({ data }) => {
                    let module = module_map[item], mutate_name = module + '/serve_' + action, action_name = module + '/serve_' + action;
                    if(data && !data.error){
                        if(_.has(this._mutations,mutate_name)) commit(mutate_name,data,{ root:true });
                        if(_.has(this._actions,action_name)) dispatch(action_name,data,{ root:true });
                    }
                    return resolve(data);
                })
        }))
    },

}

export default {
    state, getters, mutations, actions, namespaced: true
}
