import type { RouteRecord, RouteRecordName } from 'vue-router';
import { router, initRoutes, dynamicRoutes } from '@/router';
import { getRouteNames, transformRouteToMenu } from '@/helpers/route';

interface RouteState {
  mode: 'remote' | 'dynamic'; // 模式，dynamic 前端动态导入；remote 后端远程获取
  isInit: boolean; // 是否初始化
  _home: string; // 路由首页的 name
  menus: MenuRecord[]; // 菜单
  caches: string[]; // 需要开启缓存的路由 name
}

export const useRouteStore = defineStore('route', {
  state(): RouteState {
    return {
      mode: 'dynamic',
      isInit: false,
      _home: 'dashboard',
      menus: [],
      caches: []
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
      const routes: RouteRecord[] = router.getRoutes(); // getRoutes 得到的路由表是被展平的列表
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
      if (this.mode === 'dynamic') {
        await this.dynamicInit();
      } else if (this.mode === 'remote') {
        // TODO 获取远程路由表
      }
      this.isInit = true;
    },
    // static 模式初始化
    async dynamicInit() {
      this.menus = transformRouteToMenu(dynamicRoutes);
      dynamicRoutes.forEach((route) => {
        router.addRoute(route);
      });
      // TODO 需要开启缓存的路由
    }
  }
});
