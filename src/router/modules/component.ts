import { Main } from '@/layout';
import type { RouteRecordRaw } from 'vue-router';

export const record: RouteRecordRaw = {
  name: 'component',
  path: '/component',
  component: Main,
  meta: {
    title: '组件示例',
    icon: 'mdi:view-quilt',
    sort: 5
  },
  redirect: '/component/validate',
  children: [
    {
      name: 'validate',
      path: 'validate',
      meta: {
        title: '表单规则校验',
        icon: 'mdi:ruler-square-compass'
      },
      component: () => import('@/views/component/validate/index.vue')
    }
  ]
};
