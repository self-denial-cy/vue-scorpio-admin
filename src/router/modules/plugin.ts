import { Main } from '@/layout';
import type { RouteRecordRaw } from 'vue-router';

export const record: RouteRecordRaw = {
  name: 'plugin',
  path: '/plugin',
  component: Main,
  redirect: '/plugin/icon', // 防止直接通过 URL 访问到空白页签
  meta: {
    title: '插件',
    sort: 1,
    icon: 'ep:magic-stick'
  },
  children: [
    {
      path: 'icon',
      name: 'icon',
      meta: {
        title: '图标',
        icon: 'ep:star',
        cache: true
      },
      component: () => import('@/views/plugin/icon/index.vue')
    },
    {
      path: 'echarts',
      name: 'echarts',
      meta: {
        title: 'ECharts',
        icon: 'ep:pie-chart'
      },
      component: () => import('@/views/plugin/echarts/index.vue')
    },
    {
      path: 'map',
      name: 'map',
      meta: {
        title: '地图',
        icon: 'ep:map-location'
      },
      component: () => import('@/views/plugin/map/index.vue')
    }
  ]
};
