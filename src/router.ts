// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import convert from './view/convert.vue';
import setting from './view/setting.vue';

const routes = [
  {
    path: '/',
    name: 'convert',
    component: convert
  },
  {
    path: '/setting',
    name: 'setting',
    component: setting
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;