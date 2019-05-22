import Vue from 'vue';
import Router from 'vue-router';
import Starter from './pages/StarterPage.vue';
import GMNavbar from './layout/GMNavbar.vue';
import GMFooter from './layout/GMFooter.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      components: {
        default: Starter,
        header: GMNavbar,
        footer: GMFooter
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
