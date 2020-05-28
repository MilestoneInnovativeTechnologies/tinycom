
const state = {
    SOURCES,
    url: {
        create: '/admin/source/create',
        link: '/s/',
        list: '/admin/source/list',
        extend: '/admin/source/extend',
    },
    interval: {
        list: 5*60*1000
    }
}

const getters = {
    all({ SOURCES },{ source_orders },rootState){ return _.map(SOURCES,source => {
        return {
            id: source.id,
            uuid: source.uuid,
            title: source.title,
            desc: source.description,
            status: source.active === 'Y' ? 'Active' : 'Inactive',
            expire: source.expired ? 'Expired' : (readableTime(source.expire) + ' remains'),
            hits: source.hits + `+${source.expire_hits}`,
            expire_hits: source.expire_hits,
            hit: source.hits,
            orders: source_orders[_.toInteger(source.id)] ? source_orders[_.toInteger(source.id)].length : 0,
            customers: _.map(source.customers,_.toInteger),
            items: _.map(source.items,(price,item) => _.zipObject(['item','price','name'],[item,price,rootState.ITEMS.ITEMS[item].name])),
        }
    }) },
    source_orders(s,g,rootState){
        let order_source = _(rootState.CARTS.CARTS).filter(({ status }) => status !== 'New').mapKeys(({ id }) => _.toInteger(id)).mapValues(({ source }) => _.toInteger(source)).value(),
            source_orders = {};
        _.forEach(order_source,(source,order) => {
            if(!_.has(source_orders,source)) source_orders[source] = [];
            if(!_.includes(source_orders[source],order)) source_orders[source].push(_.toInteger(order))
        })
        return source_orders;
    },
    source(state,{ all }){ return (id) => _.head(_.filter(all,['id',_.toInteger(id)])) },
    source2(state,{ all }){ return (uuid) => _.head(_.filter(all,['uuid',uuid])) },
}

const mutations = {
    add(state,source){ state.SOURCES.push(source) },
    update(state,source){ let idx = _.findIndex(state.SOURCES,['uuid',source.uuid]); return (idx > -1) ? Vue.set(state.SOURCES,idx,source) : state.SOURCES.push(source) },
}

const actions = {
    init({ state,dispatch }){ setTimeout((dispatch) => dispatch('sync'),state.interval.list,dispatch) },
    create({ state,commit },data){
        return new Promise(resolve => {
            $.ajax({ url:state.url.create,data,type:"POST",enctype:'multipart/form-data',processData:false,contentType:false,success: function(R){
                commit('add',R); return resolve(R);
            }})
        });
    },
    extend({ state,commit },data){
        return new Promise(resolve => {
            $.post(state.url.extend,data,function(R){ commit('update',R); return resolve(R); })
        });
    },
    sync({ state,dispatch,commit }){
        $.post(state.url.list,function(R){
            if(R && R.length){ _.forEach(R,source => commit('update',source)) }
        }).always(() => setTimeout((dispatch) => dispatch('sync'),state.interval.list,dispatch))
    }
}

export default {
    state, getters, mutations, actions, namespaced: true
}

function readableTime(time){
    let now = parseInt(new Date().getTime()/1000),
    seconds = parseInt(time) - now; if(seconds < 60) return parseInt(seconds) + ' secs';
    let minutes = parseInt(seconds/60); if(minutes < 60) return parseInt(minutes) + ' minutes';
    let hours = parseInt(minutes/60); if(hours < 24) return parseInt(hours) + ' hours';
    return parseInt((hours/24)) + ' days';
}
