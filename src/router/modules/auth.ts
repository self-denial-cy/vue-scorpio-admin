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
    },
    {
      name: 'super',
      path: 'super',
      meta: {
        title: '超级管理员可见',
        icon: 'mdi:shield-crown-outline',
        permissions: ['super']
      },
      component: () => import('@/views/auth/super/index.vue')
    },
    {
      name: 'admin',
      path: 'admin',
      meta: {
        title: '管理员可见',
        icon: 'mdi:account-star',
        permissions: ['admin', 'super']
      },
      component: () => import('@/views/auth/admin/index.vue')
    },
    {
      name: 'user',
      path: 'user',
      meta: {
        title: '普通用户可见',
        icon: 'mdi:human-greeting-variant',
        permissions: ['user', 'admin', 'super']
      },
      component: () => import('@/views/auth/user/index.vue')
    }
  ]
};
