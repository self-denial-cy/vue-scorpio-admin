import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string; // 标题
    icon?: string; // 图标
    key?: string; // 唯一标识
    _href?: string; // 外链链接
    sort?: number; // 排序
    cache?: boolean; // 是否开启缓存
    hidden?: boolean; // 是否在菜单中隐藏
  }
}
