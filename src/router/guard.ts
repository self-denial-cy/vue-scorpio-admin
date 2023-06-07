import type { Router } from 'vue-router';
import NProgress from 'nprogress';
import { routePermission } from './permission';

NProgress.configure({ showSpinner: false });

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    NProgress.start();
    return await routePermission(to, from);
  });

  router.afterEach((to, from) => {
    console.table({ from, to });
    NProgress.done();
  });
}
