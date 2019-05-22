import Vue from 'vue';
import App from './App.vue';
import store from './store';
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './starterRouter';
import NowUiKit from './plugins/now-ui-kit';
import qs from 'qs';
import Paginate from "vuejs-paginate";

Vue.component('paginate', Paginate)

Vue.config.productionTip = false;
Vue.use(NowUiKit);
export const cartElement = new Vue();
export const globalboolean = new Vue();
Vue.prototype.$goodscartI = [];
Vue.prototype.$qs = qs;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
