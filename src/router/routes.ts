import type { RouteRecordRaw } from 'vue-router';

export const rootRoute: RouteRecordRaw = {
  name: 'root',
  path: '/',
  redirect: '/login'
};

// 初始路由列表
export const initRoutes: RouteRecordRaw[] = [
  rootRoute,
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    name: '403',
    path: '/403',
    component: () => import('@/views/403/index.vue'),
    meta: {
      title: 'Forbidden'
    }
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: 'Not Found'
    }
  },
  {
    name: '500',
    path: '/500',
    component: () => import('@/views/500/index.vue'),
    meta: {
      title: 'Internal Server Error'
    }
  },
  {
    name: '*',
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
];
