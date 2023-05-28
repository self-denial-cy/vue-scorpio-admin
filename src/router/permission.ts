import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router';

type NavigationGuardReturn = void | Error | RouteLocationRaw | boolean;

export async function routePermission(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
): Promise<NavigationGuardReturn> {
  // 动态路由

  // 外链路由
  if (to.meta._href) {
    window.open(to.meta._href as string);
    return { path: from.path, query: from.query, replace: true, hash: from.hash };
  }
}
