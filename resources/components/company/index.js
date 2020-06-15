
import Vue from 'vue';
const BVModules = require('bootstrap-vue');

const Plugins = ['Navbar','Card','Table','Form','FormGroup','InputGroup','FormSelect','FormInput','FormTextarea','FormFile','Button','Layout','Modal','Toast','Spinner','ListGroup','Badge','Icons','Pagination','Image'];
Plugins.forEach(name => Vue.use(BVModules[name+'Plugin']))

const Components = [];
Components.forEach(name => Vue.component('B'+name,BVModules['B'+name]))

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

const files2 = require.context('../common/', true, /\.vue$/i)
files2.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files2(key).default))
