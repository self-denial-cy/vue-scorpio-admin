export const useReloadStore = defineStore('reload', () => {
  const antiLoading = ref<boolean>(true);

  // TODO 重载页面，被缓存的页面触发 activated，未被缓存的页面触发 mounted
  async function reload(timeout = 0, reset = true) {
    antiLoading.value = false;
    await nextTick();
    if (timeout) {
      setTimeout(() => {
        antiLoading.value = true;
      }, timeout);
    } else {
      antiLoading.value = true;
    }
    if (reset) {
      setTimeout(() => {
        // TODO 确认会复位的内容区域？
        document.documentElement.scrollTo({ top: 0, left: 0 });
      }, 100);
    }
  }

  return { reload, antiLoading };
});
