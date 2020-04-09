import Vue from 'vue';

import Vuex from 'vuex';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import storeObject from '@/store';
import App from './App';

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = new Vuex.Store(storeObject);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
