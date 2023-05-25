import 'amfe-flexible';
import 'virtual:svg-icons-register';
import 'normalize.css';
import 'virtual:uno.css';
import 'nprogress/nprogress.css';

import './styles/css/index.css';
import App from './App.vue';
import setupRouter from './router';

async function setupApp() {
  const app = createApp(App);
  app.use(createPinia());
  await setupRouter(app);
  app.mount('#app');
}

setupApp();
