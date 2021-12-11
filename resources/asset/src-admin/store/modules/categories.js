import Vue from 'vue'

const state = {
  CATEGORIES, CATEGORY_ITEMS,
  url: {
    create: '/admin/category/create'
  },
}
const getters = {
  items({CATEGORY_ITEMS}) {
    return (category) => _.map(_.get(CATEGORY_ITEMS, _.toInteger(category), []), _.toInteger)
  }
}
const mutations = {
  update(state,data){ _.forEach(['name','description','status','media'],key => Vue.set(state.CATEGORIES[data.id],key,data[key])) },
  add(state, data) {
    if (data && data.id) Vue.set(state.CATEGORIES, _.toInteger(data.id), data)
  },
  addItem(state, {item, category}) {
    item = _.toInteger(item);
    category = _.toInteger(category);
    return _.has(state.CATEGORY_ITEMS, category) ? state.CATEGORY_ITEMS[category].push(item) : Vue.set(state.CATEGORY_ITEMS, category, [item])
  },
  removeItem(state, {item, category}) {
    item = _.toInteger(item);
    category = _.toInteger(category);
    if (state.CATEGORY_ITEMS[category] && _.indexOf(state.CATEGORY_ITEMS[category], item) > -1)
      state.CATEGORY_ITEMS[category].splice(_.indexOf(state.CATEGORY_ITEMS[category], item), 1)
  },
}
const actions = {
  create({state, commit}, data) {
    $.post(state.url.create, data).then(({data}) => commit('add', data))
  }
}

export default {
  state, getters, mutations, actions, namespaced: true
}
