import type { RouteRecordRaw } from 'vue-router';
import { Main } from '@/layout';

export const record: RouteRecordRaw = {
  name: '_dashboard',
  path: '/_dashboard',
  component: Main,
  redirect: '/dashboard',
  children: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        title: '主页'
      }
    }
  ]
};
