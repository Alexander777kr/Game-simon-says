import { createApp } from 'vue';
import App from './App.vue';
import Container from './components/slots/Container.vue';
const app = createApp(App);
app.config.devtools = true;
app.component('container-slot', Container);
app.mount('#app');
