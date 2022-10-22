import Vue from 'vue';
import VueRouter from 'vue-router';
import MisPromocionesView from '../views/MisPromociones.vue';

Vue.use(VueRouter);

const routes = [{ path: '/', name: 'home', component: MisPromocionesView }];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
