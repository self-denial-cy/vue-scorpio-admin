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

// 用户角色
type RoleType = keyof typeof import('@/enum')['Role'];

// 用户
type UserInfo = {
  id: string;
  name: string;
  role: RoleType;
};
