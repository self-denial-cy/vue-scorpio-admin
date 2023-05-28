import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { setupRouterGuard } from './guard';
import { initRoutes } from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes: [...initRoutes]
});

export default async function setupRouter(app: App) {
  app.use(router);
  setupRouterGuard(router);
  await router.isReady();
}
