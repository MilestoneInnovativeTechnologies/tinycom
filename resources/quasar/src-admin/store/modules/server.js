import formData from "assets/formData";

const state = {

    module_map: {
        category: 'CATEGORIES',
        item: 'ITEMS',
    },

    commit_map: {
        update: {
            category: 'update',
        }
    },

    action_map: {
        update: {
            item: 'update'
        },
    },

    url: {
        update: {
            category: '/admin/api/category/[id]/update',
            item: '/admin/api/item/[id]/update',
        },
        admin: {
            password: '/admin/api/password/update',
        },
        logo: {
            company: '/admin/api/company/logo'
        }
    }
}
const getters = {
}


const mutations = {

}


const actions = {
    serverItemAction({ dispatch,commit,state },{ id,data,item,action }){
        return new Promise(((resolve, reject) => {
            let url = state.url[action][item].replace(/\[(\w+)?\]/,function(f,i){ return eval(i) }); if(!url) return reject('no url');
            $.post(url,data).then(({ data }) => {
              let module = state.module_map[item];
              let mutate = _.get(state.commit_map,[action,item]); if(mutate) commit(`${module}/${mutate}`,data,{ root:true });
              let vAction = _.get(state.action_map,[action,item]); if(vAction) dispatch(`${module}/${vAction}`,data,{ root:true });
              return resolve(data);
            })
        }))
    },
    password({ state },password){
        return new Promise(resolve => $.post(state.url.admin.password,formData.obj({ password })).then(({ data }) => resolve(data)));
    },
}

export default {
    state, getters, mutations, actions, namespaced: true
}
