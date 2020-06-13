
import Vue from 'vue';
const BVModules = require('bootstrap-vue');

const Plugins = ['Layout'];
const files = require.context('./', true, /\.vue$/i)
const Components = [];

Plugins.forEach(name => Vue.use(BVModules[name+'Plugin']))
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
Components.forEach(name => Vue.component('B'+name,BVModules['B'+name]))
