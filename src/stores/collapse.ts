export const useCollapseStore = defineStore('collapse', () => {
  const collapse = ref<boolean>(false);

  function toggleCollapse() {
    collapse.value = !collapse.value;
  }

  return { collapse, toggleCollapse };
});
