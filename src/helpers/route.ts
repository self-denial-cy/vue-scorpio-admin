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
    const fullPath = `${parentPath ? `${parentPath}/` : ''}${path}`;
    if (route.children && route.children.length) {
      children = transformRouteToMenu(route.children, fullPath);
    }
    const menu: MenuRecord = {
      key: name,
      label: meta ? meta.title : '',
      name: name,
      path: fullPath,
      icon: meta ? meta.icon : '',
      children: children
    };
    // TODO 是否在菜单中隐藏
    menus.push(menu);
  });
  return menus;
}
