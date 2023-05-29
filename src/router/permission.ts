import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router';
import { useRouteStore } from '@/stores';

type NavigationGuardReturn = void | Error | RouteLocationRaw | boolean;

export async function routePermission(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
): Promise<NavigationGuardReturn> {
  // 动态路由
  const route = useRouteStore();
  const isLogin = true; // TODO 登录状态取动态值
  if (!route.isInit) {
    // 未登录
    if (!isLogin) {
      if (to.name && route.isValidInitRoute(to.name)) {
        return;
      } else {
        return { name: 'login', query: { redirect: to.fullPath } };
      }
    }
    await route.init();
    if (to.name === '*') {
      // 动态路由还未加载完成，导致被 * 路由捕获，等待动态路由加载完成，跳转回目标路由
      return { path: to.path, query: to.query, replace: true, hash: to.hash };
    }
  }
  // 动态路由已经加载完毕，仍然没有匹配到路由，跳转到 404
  if (to.name === '*') {
    return { name: '404', replace: true };
  }
  // 外链路由
  if (to.meta._href) {
    window.open(to.meta._href);
    return { path: from.path, query: from.query, replace: true, hash: from.hash };
  }
}
