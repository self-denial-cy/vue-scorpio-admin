import {
  clearTabs as _clearTabs,
  setTabs,
  getTabRecordByRoute,
  isInTabsByFullPath,
  getTabs,
  getIndexByRouteName
} from '@/helpers';
import { useRouterPush } from '@/composables';
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { router } from '@/router';

interface TabState {
  tabs: TabRecord[]; // 多页签数组
  _home: TabRecord; // 多页签首页
  _active: string; // 当前激活的页签【根据 fullPath 判断】
}

export const useTabStore = defineStore('tab', {
  state(): TabState {
    return {
      tabs: [],
      _home: {
        name: 'root',
        fullPath: '/',
        meta: {}
      },
      _active: ''
    };
  },
  getters: {
    // 当前激活的页签索引
    _index(state) {
      const { tabs, _active } = state;
      return tabs.findIndex((_) => _.fullPath === _active);
    }
  },
  actions: {
    // 重置 tab store
    resetTabStore() {
      _clearTabs();
      this.$reset();
    },
    // 缓存多页签数据
    cacheTabs() {
      setTabs(this.tabs);
    },
    // 设置激活的页签【根据 fullPath】
    setActive(fullPath: string) {
      this._active = fullPath;
    },
    // 添加页签数据
    addTab(route: RouteLocationNormalizedLoaded) {
      const record = getTabRecordByRoute(route);
      // 如果页签数据已存在【根据 fullPath 判断】
      if (isInTabsByFullPath(this.tabs, record.fullPath)) return;
      this.tabs.push(record);
    },
    // 删除页签数据【根据 fullPath】
    removeTab(fullPath: string) {
      const isActive = fullPath === this._active;
      const filterTabs = this.tabs.filter((tab) => tab.fullPath !== fullPath);
      this.tabs = filterTabs;
      if (isActive && filterTabs.length) {
        const targetFullPath = filterTabs[filterTabs.length - 1].fullPath;
        this.setActive(targetFullPath);
        const { routerPush } = useRouterPush(false);
        routerPush(targetFullPath);
      }
    },
    // 清空多页签【excludes 保留的页签的 fullPath 集合】
    async clearTabs(excludes: string[] = []) {
      const remain = [this._home.fullPath, ...excludes];
      const hasActive = remain.includes(this._active);
      const filterTabs = this.tabs.filter((tab) => remain.includes(tab.fullPath));
      if (hasActive) {
        // 保留的页签集合包含当前激活页签，因此不需要进行跳转
        this.tabs = filterTabs;
      } else if (!hasActive && filterTabs.length) {
        // 保留的页签集合中不包含当前激活页签，需要跳转
        const targetFullPath = filterTabs[filterTabs.length - 1].fullPath;
        const { routerPush } = useRouterPush(false);
        try {
          await routerPush(targetFullPath);
          this.tabs = filterTabs;
          this.setActive(targetFullPath);
        } catch {
          // catch err
        }
      }
    },
    // 点击单个页签
    handleTabClick(fullPath: string) {
      const isActive = this._active === fullPath;
      if (!isActive) {
        this.setActive(fullPath);
        const { routerPush } = useRouterPush(false);
        routerPush(fullPath);
      }
    },
    // 初始化首页页签
    initHomeTab(homeName: string, router: Router) {
      const routes = router.getRoutes(); // getRoutes 得到的路由表是被展平的列表
      const homeRoute = routes.find((route) => route.name === homeName);
      if (homeRoute && (!homeRoute.children || !homeRoute.children.length)) {
        // 有子路由不能作为 Tab
        this._home = getTabRecordByRoute(homeRoute);
      }
    },
    // 初始化
    init(currentRoute: RouteLocationNormalizedLoaded) {
      // let tabs: TabRecord[] = []; // 不缓存多页签
      let tabs: TabRecord[] = getTabs(); // 缓存多页签
      const hasHome = getIndexByRouteName(tabs, this._home.name as string) > -1;
      if (!hasHome && this._home.name !== 'root') {
        // 如果缓存的多页签数据中没有首页页签且首页页签已经初始化了
        tabs.unshift(this._home);
      }
      const isHome = currentRoute.fullPath === this._home.fullPath;
      if (!isHome) {
        // 页面初始访问的不是首页
        const record = getTabRecordByRoute(currentRoute);
        const hasCurrent = isInTabsByFullPath(tabs, record.fullPath);
        if (!hasCurrent) {
          // 且访问的页面不在多页签中【直接通过 URL 访问】
          tabs.push(record);
        }
      }

      // 切换用户角色时，失去访问权限的菜单不应出现在 Tab 中
      const routes = router.getRoutes();
      tabs = tabs.filter((tab) => routes.some((route) => route.name === tab.name));
      // 当前激活的 tab 也要确保在可访问菜单中，否则回滚至主页
      const activeTab = tabs.some((tab) => tab.name === currentRoute.name) ? currentRoute : this._home;

      this.tabs = tabs;
      this.setActive(activeTab.fullPath);
    }
  }
});
