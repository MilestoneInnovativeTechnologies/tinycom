const state = {
    DATA: [],
    DOMAINS
}
const getters = {
    index({ DATA }){ return _(DATA).map('id').invert().mapValues(_.toInteger).value() },
    dParts({ DOMAINS }){
        return (host) => {
            let domain =  host, sub = '';
            if(_.includes(DOMAINS,host)) return { domain,sub };
            let parts = host.split("."), loop = parts.length;
            while(--loop >= 0){
                sub = parts.slice(0,loop).join('.'); domain = parts.slice(loop,parts.length).join('.');
                if(_.includes(DOMAINS,domain)) return { domain,sub };
            }
            return { domain,sub };
        }
    },
}
const mutations = {
    add(state,data){ state.DATA.push(data) },
    update(state,{ data,index }){ Vue.set(state.DATA,index,data) },
    delete(state,index){ Vue.delete(state.DATA,index) },
}
const actions = {
    serve_create({ getters,commit },{ data }){ let index = _.get(getters.index,data.id,null); return index !== null ? commit('update',{ data,index }) : commit('add',data) },
    serve_fetch({ dispatch },{ data }){ _(data).forEach(company => dispatch('serve_create',{ data:company })) },
    serve_subscriptions({ dispatch },{ data }){ dispatch('SUBSCRIPTIONS/serve_fetch',{ data },{ root:true }) },
    serve_delete({ commit,getters },{ data }){ let index = getters.index[data]; commit('delete',index); },
    serve_referrer({ dispatch,getters },{ data,error }){ if(!error) dispatch('serve_create',{ data }); },
    serve_update({ dispatch },{ data,error }){ if(!error) dispatch('serve_create',{ data }); },
}

export default {
    state, getters, mutations, actions, namespaced: true
}
