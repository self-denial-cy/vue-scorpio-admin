// 菜单项
type MenuRecord = {
  key?: string | symbol;
  label?: string;
  name?: string | symbol;
  path: string;
  icon?: string;
  children?: Array<MenuRecord>;
};
