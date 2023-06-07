import type { RouteRecordRaw } from 'vue-router';
import { Main } from '@/layout';

export const record: RouteRecordRaw = {
  name: '_about',
  path: '/_about',
  component: Main,
  redirect: '/about',
  meta: {
    title: '关于',
    _hidden: true,
    sort: 1
  },
  children: [
    {
      name: 'about',
      path: '/about',
      component: () => import('@/views/about/index.vue'),
      meta: {
        title: '关于',
        icon: 'ep:info-filled'
      }
    }
  ]
};
