import { clearTabs as _clearTabs, setTabs, getTabRecordByRoute, isInTabsByFullPath } from '@/helpers';
import { useRouterPush } from '@/composables';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

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
    }
  }
});
