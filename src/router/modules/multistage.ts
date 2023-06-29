import { Main } from '@/layout';
import type { RouteRecordRaw } from 'vue-router';

export const record: RouteRecordRaw = {
  name: 'multistage',
  path: '/multistage',
  redirect: '/multistage/first/second/third',
  component: Main,
  meta: {
    title: '多级菜单',
    icon: 'mdi:card-multiple-outline',
    sort: 6
  },
  children: [
    {
      name: 'first',
      path: 'first',
      meta: {
        title: '一级菜单',
        icon: 'mdi:numeric-1-box-multiple-outline'
      },
      redirect: '/multistage/first/second/third',
      children: [
        {
          name: 'second',
          path: 'second',
          meta: {
            title: '二级菜单',
            icon: 'mdi:numeric-2-box-multiple-outline'
          },
          redirect: '/multistage/first/second/third',
          children: [
            {
              name: 'third',
              path: 'third',
              meta: {
                title: '三级菜单',
                icon: 'mdi:numeric-3-box-multiple-outline'
              },
              component: () => import('@/views/multistage/first/second/third/index.vue')
            }
          ]
        }
      ]
    }
  ]
};
