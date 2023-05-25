import type { App } from 'vue';
import Lottie from 'vue3-lottie';
import 'vue3-lottie/dist/style.css';

export default function setupExternal(app: App) {
  // 注册全局 Lottie 动画组件
  app.use(Lottie, { name: 'Lottie' });
}
