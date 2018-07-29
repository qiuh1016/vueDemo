// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import App from './App';
import router from './router';

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueLazyload, {
  loading: '/static/loading-svg/loading-bubbles.svg',
});
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    username: '',
    cartCount: 0,
  },
  mutations: {
    updateUsername(state, username) {
      state.username = username;
    },
    updateCartCount(state, cartCount) {
      state.cartCount += cartCount;
    },
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
