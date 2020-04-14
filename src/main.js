import storeObject from '@/store';
import '@/styles/index.scss';

import Vue from 'vue';

import Vuex from 'vuex';

import VueLazyload from 'vue-lazyload';

import { ModalPlugin } from 'bootstrap-vue';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  error: '/',
});
Vue.use(Vuex);
Vue.use(ModalPlugin);

const store = new Vuex.Store(storeObject);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
