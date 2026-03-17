import { createRouter, createWebHistory } from 'vue-router';
import Convert from './view/convert.vue';
import Setting from './view/setting.vue';

const routes = [
  {
    path: '/',
    name: 'convert',
    component: Convert
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;