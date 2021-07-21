import { createApp } from 'vue';
import Dev from './serve.vue';
import "../src/assets/css/app.css"
import "../src/assets/css/flex.css"
import "../src/assets/css/reset.css"
import "../src/assets/css/irregulars.css"
import "../src/assets/css/transitions.css"
import Vue3Panorama from '@/entry.esm';

const app = createApp(Dev);
app.use(Vue3Panorama);

app.mount('#app');
