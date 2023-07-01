import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { setupRouterGuard } from './guard';
import { initRoutes } from './routes';

export const router = createRouter({
  history: createWebHashHistory(), // 因为部署到 GitHub Pages，无法适配 createWebHistory mode，但是如果有个人服务器的话，可以自行配置
  routes: [...initRoutes]
});

export default async function setupRouter(app: App) {
  app.use(router);
  setupRouterGuard(router);
  await router.isReady();
}

export * from './routes';
export * from './modules';
