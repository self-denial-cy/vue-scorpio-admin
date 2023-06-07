import { useTabStore } from '@/stores';
import { useEventListener } from '@vueuse/core';

// 绑定全局事件
export function useGlobalEvents() {
  const tab = useTabStore();
  useEventListener(window, 'beforeunload', () => {
    tab.cacheTabs();
  });
}
