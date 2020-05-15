
const state = {

    module_map: {
        category: 'CATEGORIES',
        item: 'ITEMS',
    },

    commit_map: {
        update:{
            category: 'update',
            item: 'update',
        }
    },

    action_map: {
    },

    url: {
        update: {
            category: '/admin/api/category/[id]/update',
            item: '/admin/api/item/[id]/update',
        },
        admin: {
            password: '/admin/api/password/update',
        }
    }
}
const getters = {
}


const mutations = {

}


const actions = {
    serverItemAction({ dispatch,commit,state },{ id,data,item,action }){
        let url = state.url[action][item].replace(/\[(\w+)?\]/,function(f,i){ return eval(i) }); if(!url) return;
        $.ajax({ url,type:'post',data,processData:false,contentType:false,success:function(R){
                let module = state.module_map[item];
                let mutate = _.get(state.commit_map,[action,item]); if(mutate) return commit(`${module}/${mutate}`,R,{ root:true });
                let vAction = _.get(state.action_map,[action,item]); if(vAction) return dispatch(`${module}/${vAction}`,R,{ root:true });
            } },function(R){
        })
    },
    updateCategory({ dispatch,commit,state },{ id,data }){
        let url = state.url.update.category.replace(/\[(\w+)?\]/,function(f,i){ return eval(i) });
        $.ajax({ url,type:'post',data,processData:false,contentType:false,success:function(R){
                let item = 'category', action = 'update';
                let module = state.module_map[item];
                let mutate = _.get(state.commit_map,[action,item]); if(mutate) return commit(`${module}/${mutate}`,R,{ root:true });
                let vAction = _.get(state.action_map,[action,item]); if(vAction) return dispatch(`${module}/${vAction}`,R,{ root:true });
            } },function(R){
        })
    },
    password({ state },password){
        return new Promise(resolve => $.post(state.url.admin.password,{ password },function(R){ return resolve() }));
    },
}

export default {
    state, getters, mutations, actions, namespaced: true
}
