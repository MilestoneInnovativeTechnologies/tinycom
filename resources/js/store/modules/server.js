
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
            $.ajax({ url,type:'post',data,processData:false,contentType:false,success:function(R){
                    let module = state.module_map[item];
                    let mutate = _.get(state.commit_map,[action,item]); if(mutate) commit(`${module}/${mutate}`,R,{ root:true });
                    let vAction = _.get(state.action_map,[action,item]); if(vAction) dispatch(`${module}/${vAction}`,R,{ root:true });
                    return resolve(R);
                } })
        }))
    },
    updateCategory({ dispatch,commit,state },{ id,data }){
        let url = state.url.update.category.replace(/\[(\w+)?\]/,function(f,i){ return eval(i) });
        $.ajax({ url,type:'post',data,processData:false,contentType:false,success:function(R){
                let item = 'category', action = 'update';
                let module = state.module_map[item];
                let mutate = _.get(state.commit_map,[action,item]); if(mutate) return commit(`${module}/${mutate}`,R,{ root:true });
                let vAction = _.get(state.action_map,[action,item]); if(vAction) return dispatch(`${module}/${vAction}`,R,{ root:true });
            } })
    },
    password({ state },password){
        return new Promise(resolve => $.post(state.url.admin.password,{ password },function(R){ return resolve() }));
    },
}

export default {
    state, getters, mutations, actions, namespaced: true
}
