import type { RouteRecord, RouteRecordName } from 'vue-router';
import { router, initRoutes, dynamicRoutes } from '@/router';
import { getRouteNames, transformRouteToMenu, getCacheRouteNames } from '@/helpers/route';

interface RouteState {
  mode: 'remote' | 'dynamic'; // 模式，dynamic 前端动态导入；remote 后端远程获取
  isInit: boolean; // 是否初始化
  _home: string; // 路由首页的 name
  menus: MenuRecord[]; // 菜单
  caches: Array<string | symbol>; // 需要开启缓存的路由 name
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
    // dynamic 模式初始化
    async dynamicInit() {
      // ! 这里有点隐藏的漏洞，虽然根据 meta.hidden 在菜单中隐藏了，但其实还是动态注入了路由表，直接通过 URL 还是可以访问到
      this.menus = transformRouteToMenu(dynamicRoutes); // 生成菜单
      dynamicRoutes.forEach((route) => {
        router.addRoute(route); // 动态注入路由组件
      });
      this.caches = getCacheRouteNames(dynamicRoutes); // 收集开启缓存的路由 name【保证组件 name 与路由 name 一致才生效】
    }
  }
});
