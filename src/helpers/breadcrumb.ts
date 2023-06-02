import type { RouteRecordName } from 'vue-router';

// 根据菜单数据和当前路由获取面包屑数据
export function getBreadcrumbs(activeName: RouteRecordName | null | undefined, menus: MenuRecord[]) {
  if (!activeName) return []; // 如果路由没有命名，无法循迹到其面包屑数据
  return pathSearch(menus, (menu) => menu.name === activeName);
}

// 菜单树结构路径查找
function pathSearch(menus: MenuRecord[], fn: (menu: MenuRecord) => boolean, path: MenuRecord[] = []): MenuRecord[] {
  for (const menu of menus) {
    path.push(menu);
    if (fn(menu)) return path;
    if (menu.children && menu.children.length) {
      const _path = pathSearch(menu.children, fn, path);
      if (_path?.length) return _path;
    }
    path.pop();
  }
  return [];
}
