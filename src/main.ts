import 'amfe-flexible';
import 'virtual:svg-icons-register';
import 'virtual:uno.css';
import 'nprogress/nprogress.css';

import './styles/css/index.css';
import './styles/scss/index.scss';
import App from './App.vue';
import setupRouter from './router';
import setupExternal from './external';

async function setupApp() {
  const app = createApp(App);
  app.use(createPinia());
  setupExternal(app);
  await setupRouter(app);
  app.mount('#app');
}

setupApp();
