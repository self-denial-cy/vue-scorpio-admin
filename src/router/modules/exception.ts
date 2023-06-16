import { Main } from '@/layout';
import type { RouteRecordRaw } from 'vue-router';

export const record: RouteRecordRaw = {
  path: '/exception',
  name: 'exception',
  component: Main,
  meta: {
    title: '异常页',
    sort: 2,
    icon: 'mdi:lightbulb-alert-outline'
  },
  redirect: '/exception/403',
  children: [
    {
      path: '403',
      name: 'exception_403',
      meta: {
        title: '403',
        icon: 'mdi:eye-lock-outline'
      },
      component: () => import('@/views/403/index.vue')
    },
    {
      path: '404',
      name: 'exception_404',
      meta: {
        title: '404',
        icon: 'mdi:eye-off-outline'
      },
      component: () => import('@/views/404/index.vue')
    },
    {
      path: '500',
      name: 'exception_500',
      meta: {
        title: '500',
        icon: 'mdi:close-octagon-outline'
      },
      component: () => import('@/views/500/index.vue')
    }
  ]
};
