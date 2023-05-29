import type { RouteRecord, RouteRecordName } from 'vue-router';
import { router, initRoutes, dynamicRoutes } from '@/router';
import { getRouteNames, transformRouteToMenu } from '@/helpers/route';

interface RouteState {
  mode: 'static' | 'dynamic'; // 模式，static 前端声明的静态；dynamic 后端返回的动态
  isInit: boolean; // 是否初始化
  _home: string; // 路由首页的 name
  menus: MenuRecord[]; // 菜单
  _cache: string[]; // 缓存的路由 name
}

export const useRouteStore = defineStore('route', {
  state(): RouteState {
    return {
      mode: 'static',
      isInit: false,
      _home: 'login',
      menus: [],
      _cache: []
    };
  },
  actions: {
    // 重置路由 store
    resetRouteStore() {
      this.resetRoutes();
      this.$reset();
    },
    // 重置路由表，保留初始路由
    resetRoutes() {
      const routes: RouteRecord[] = router.getRoutes();
      this.removeDynamicRoute(routes);
    },
    removeDynamicRoute(routes: RouteRecord[]) {
      routes.forEach((route) => {
        if (route.name && !this.isInitRoute(route.name)) {
          router.removeRoute(route.name);
        }
      });
    },
    // 判断是否是初始路由
    isInitRoute(name: RouteRecordName) {
      return getRouteNames(initRoutes).includes(name);
    },
    // 判断是否是有效的初始路由
    isValidInitRoute(name: RouteRecordName) {
      return this.isInitRoute(name) && name !== '*';
    },
    // 初始化异步路由
    async init() {
      if (this.mode === 'static') {
        await this.staticInit();
      } else if (this.mode === 'dynamic') {
        // TODO
      }
      this.isInit = true;
    },
    // static 模式初始化
    async staticInit() {
      this.menus = transformRouteToMenu(dynamicRoutes);
      dynamicRoutes.forEach((route) => {
        router.addRoute(route);
      });
    }
  }
});
