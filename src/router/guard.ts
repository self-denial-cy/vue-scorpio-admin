import type { Router } from 'vue-router';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

export default function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    NProgress.start();
  });

  router.afterEach((to, from) => {
    NProgress.done();
  });
}
