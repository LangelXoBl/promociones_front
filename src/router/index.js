import Vue from 'vue';
import VueRouter from 'vue-router';
import MisPromocionesView from '../views/MisPromociones.vue';
import CrearPromocion from '../views/createPromo.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'home', component: MisPromocionesView },
  { path: '/create', name: 'crear', component: CrearPromocion },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
