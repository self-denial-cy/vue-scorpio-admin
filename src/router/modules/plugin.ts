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
    },
    {
      path: 'swiper',
      name: 'swiper',
      meta: {
        title: 'Swiper',
        icon: 'ep:film'
      },
      component: () => import('@/views/plugin/swiper/index.vue')
    },
    {
      path: 'clipboard',
      name: 'clipboard',
      meta: {
        title: '剪切板',
        icon: 'mdi:clipboard-text'
      },
      component: () => import('@/views/plugin/clipboard/index.vue')
    },
    {
      path: 'editor',
      name: 'editor',
      redirect: '/plugin/editor/markdown',
      meta: {
        title: '编辑器',
        icon: 'mdi:circle-edit-outline'
      },
      children: [
        {
          path: 'markdown',
          name: 'markdown',
          meta: {
            title: 'Markdown',
            icon: 'mdi:language-markdown-outline'
          },
          component: () => import('@/views/plugin/editor/markdown/index.vue')
        },
        {
          path: 'rich',
          name: 'rich',
          meta: {
            title: '富文本',
            icon: 'mdi:file-document-edit-outline'
          },
          component: () => import('@/views/plugin/editor/rich/index.vue')
        }
      ]
    },
    {
      path: 'video',
      name: 'video',
      meta: {
        title: '视频',
        icon: 'mdi:video-vintage'
      },
      component: () => import('@/views/plugin/video/index.vue')
    }
  ]
};
