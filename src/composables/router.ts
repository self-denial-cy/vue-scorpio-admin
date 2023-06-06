import type { RouteLocationRaw } from 'vue-router';
import { router as _router } from '@/router';

type TargetType = '_blank';

export function useRouterPush(setup = true) {
  const router = setup ? useRouter() : _router;
  // const route = setup ? useRoute() : _router.currentRoute;

  function routerPush(to: RouteLocationRaw, target?: TargetType): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (target) {
          // 在新的浏览器标签页打开
          window.open(router.resolve(to).href, target);
        } else {
          router.push(to);
        }
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  return { routerPush };
}
