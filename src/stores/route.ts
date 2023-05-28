interface RouteState {
  mode: 'static' | 'dynamic'; // 模式，static 前端声明的静态；dynamic 后端返回的动态
  isInit: boolean; // 是否初始化
  _home: string; // 路由首页的 name
  menus: MenuRecord[]; // 菜单
  _cache: string[]; // 缓存的路由 name
}

export const useRouteStore = defineStore('route', {});
