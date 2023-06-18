import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

export function useLayout() {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isMobile = breakpoints.smaller('sm');

  return { isMobile };
}
