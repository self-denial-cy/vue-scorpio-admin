import { Main } from '@/layout';
import type { RouteRecordRaw } from 'vue-router';

export const record: RouteRecordRaw = {
  name: 'function',
  path: '/function',
  component: Main,
  meta: {
    title: '功能示例',
    icon: 'ep:star-filled',
    sort: 4
  },
  redirect: '/function/context',
  children: [
    {
      name: 'context',
      path: 'context',
      meta: {
        title: '共享上下文',
        icon: 'mdi:share-all'
      },
      component: () => import('@/views/function/context/index.vue')
    },
    {
      name: 'chain',
      path: 'chain',
      meta: {
        title: '责任链模式',
        icon: 'mdi:resistor-nodes'
      },
      component: () => import('@/views/function/chain/index.vue')
    }
  ]
};
