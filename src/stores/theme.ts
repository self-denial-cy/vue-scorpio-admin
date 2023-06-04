import { createGlobalState, useDark, useToggle } from '@vueuse/core';

export const useThemeStore = createGlobalState(() => {
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  return { isDark, toggleDark };
});
