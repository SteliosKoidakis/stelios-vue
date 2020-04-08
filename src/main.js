import Vue from 'vue';

import Vuex from 'vuex';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
