
const state = {
    SOURCES,
    url: {
        create: '/admin/source/create',
        link: '/s/',
    },
}

const getters = {
    all({ SOURCES },g,rootState){ return _.map(SOURCES,source => {
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
            orders: source.orders,
            customers: _.map(source.customers,_.toInteger),
            items: _.map(source.items,(price,item) => _.zipObject(['item','price','name'],[item,price,rootState.ITEMS.ITEMS[item].name])),
        }
    }) },
    source(state,{ all }){ return (id) => _.head(_.filter(all,['id',_.toInteger(id)])) }
}

const mutations = {
    add(state,source){ state.SOURCES.push(source) }
}

const actions = {

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
