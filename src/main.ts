import 'amfe-flexible';
import 'virtual:svg-icons-register';
import 'virtual:uno.css';
import 'normalize.css';

import App from './App.vue';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
