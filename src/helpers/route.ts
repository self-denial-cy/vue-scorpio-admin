import type { RouteRecordRaw } from 'vue-router';

export function generateDynamicRoutes(modules: Record<string, { record: RouteRecordRaw }>) {
  const routes: RouteRecordRaw[] = [];
  Object.keys(modules).forEach((key) => {
    routes.push(modules[key].record);
  });
  // 使用 flat 方法浅拷贝一下路由表
  return sortRoutes(routes.flat());
}

// 路由根据 meta.sort 排序
function sortRoutes(routes: RouteRecordRaw[]) {
  return routes.sort((next, pre) => (next.meta?.sort ?? 0) - (pre.meta?.sort ?? 0));
}

// 获取路由表的 name 集合
export function getRouteNames(routes: RouteRecordRaw[]) {
  return routes.flatMap((route) => getRouteName(route));
}

function getRouteName(route: RouteRecordRaw) {
  const names = [route.name];
  if (route.children && route.children.length) {
    names.push(...route.children.flatMap((item) => getRouteName(item)));
  }
  return names;
}

// 将路由转换为菜单
export function transformRouteToMenu(routes: RouteRecordRaw[], parentPath?: string): MenuRecord[] {
  const menus: MenuRecord[] = [];
  routes.forEach((route) => {
    const { name, path, meta } = route;
    let children: MenuRecord[] = [];
    const fullPath = `${parentPath ? `${parentPath}/` : ''}${path}`; // 考虑到子路由的 path 是相对 path 的情况
    if (route.children && route.children.length) {
      children = transformRouteToMenu(route.children, fullPath);
    }
    const menu: MenuRecord = {
      key: name,
      label: meta?.title,
      name: name,
      path: fullPath,
      icon: meta?.icon,
      children: children
    };
    if (!route.meta?.hidden) {
      menus.push(menu); // 子路由会受父路由 hidden 的影响，如果父路由 hidden了，所有的子路由也会随之 hidden
    }
  });
  return menus;
}

// 递归获取需要缓存的路由【这里收集的是路由的 name，要保证组件的 name 与路由 name 一致才有效】
export function getCacheRouteNames(routes: RouteRecordRaw[]) {
  const cacheNames: Array<string | symbol> = [];
  function each(routes: RouteRecordRaw[], cacheNames: Array<string | symbol>) {
    routes.forEach((route) => {
      if (route.meta?.cache && route.name) {
        cacheNames.push(route.name);
      }
      if (route.children && route.children.length) {
        each(route.children, cacheNames);
      }
    });
  }
  each(routes, cacheNames);
  return cacheNames;
}
