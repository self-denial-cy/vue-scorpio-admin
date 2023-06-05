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
  getters: {},
  actions: {}
});
