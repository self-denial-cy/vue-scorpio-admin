import type { RouteRecordRaw } from 'vue-router';

export function generateDynamicRoutes(modules: Record<string, { route: RouteRecordRaw }>) {
  const routes: RouteRecordRaw[] = [];
  Object.keys(modules).forEach((key) => {
    routes.push(modules[key].route);
  });
  return routes;
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
      label: meta ? (meta.title as string) : '',
      name: name,
      path: fullPath,
      icon: meta ? (meta.icon as string) : '',
      children: children
    };
    menus.push(menu);
  });
  return menus;
}
