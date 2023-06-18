import { Main } from '@/layout';
import type { RouteRecordRaw } from 'vue-router';

export const record: RouteRecordRaw = {
  name: 'auth',
  path: '/auth',
  component: Main,
  meta: {
    title: '访问权限',
    icon: 'mdi:filter-menu-outline',
    sort: 3
  },
  children: [
    {
      name: 'permission',
      path: 'permission',
      meta: {
        title: '角色权限',
        icon: 'mdi:nintendo-switch'
      },
      component: () => import('@/views/auth/permission/index.vue')
    }
  ]
};
