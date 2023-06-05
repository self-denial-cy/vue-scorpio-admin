// 菜单项
type MenuRecord = {
  key?: string | symbol;
  label?: string;
  name?: string | symbol;
  path: string;
  icon?: string;
  children?: Array<MenuRecord>;
};

// 多页签 Tab 项
type TabRecord = Pick<import('vue-router').RouteLocationNormalizedLoaded, 'name' | 'meta' | 'fullPath'>;
