import type { RouteRecordRaw } from 'vue-router';

export const record: RouteRecordRaw = {
  name: '_dashboard',
  path: '/_dashboard',
  redirect: '/dashboard',
  meta: {
    title: '主页',
    sort: 1
  },
  children: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        title: '仪表盘'
      }
    }
  ]
};
