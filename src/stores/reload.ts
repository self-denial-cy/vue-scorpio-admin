export const useReloadStore = defineStore('reload', () => {
  const flag = ref<boolean>(true);

  // TODO 重载页面，被缓存的页面触发 activated，未被缓存的页面触发 mounted
  async function reload(timeout = 0, reset = true) {
    flag.value = false;
    await nextTick();
    if (timeout) {
      setTimeout(() => {
        flag.value = true;
      }, timeout);
    } else {
      flag.value = true;
    }
    if (reset) {
      setTimeout(() => {
        // TODO 确认会复位的内容区域？
        console.log(document.documentElement);
        document.documentElement.scrollTo({ top: 0, left: 0 });
      }, 100);
    }
  }

  return { reload, flag };
});
