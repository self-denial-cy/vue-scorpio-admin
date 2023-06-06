import { setLocal, getLocal } from '@/utils';
import { StorageKey } from '@/enum';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

// 根据 route 获取 TabRecord
export function getTabRecordByRoute(route: RouteLocationNormalizedLoaded) {
  const record: TabRecord = {
    name: route.name,
    meta: route.meta,
    fullPath: route.fullPath || route.path
  };
  return record;
}

// 获取页签在多页签中的索引【根据路由名称】
export function getIndexByRouteName(tabs: TabRecord[], name: string) {
  return tabs.findIndex((_) => _.name === name);
}

// 获取页签在多页签中的索引【根据 fullPath】
export function getIndexByFullPath(tabs: TabRecord[], fullPath: string) {
  return tabs.findIndex((_) => _.fullPath === fullPath);
}

// 判断页签是否在多页签数据中【根据 fullPath】
export function isInTabsByFullPath(tabs: TabRecord[], fullPath: string) {
  return getIndexByFullPath(tabs, fullPath) > -1;
}

// 获取缓存的多页签数据
export function getTabs() {
  const records: TabRecord[] = [];
  const data = getLocal<TabRecord[]>(StorageKey['tabs']);
  if (data) {
    records.push(...data);
  }
  return records;
}

// 缓存多页签数据
export function setTabs(data: TabRecord[]) {
  setLocal(StorageKey['tabs'], data);
}

// 清空多页签数据
export function clearTabs() {
  setTabs([]);
}
