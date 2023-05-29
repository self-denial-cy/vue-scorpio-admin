import type { RouteRecordRaw } from 'vue-router';

export const route: RouteRecordRaw = {
  name: 'dashboard',
  path: '/dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    title: '主页'
  }
};
