import "bootstrap/dist/css/bootstrap.css";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


createApp(App).use(VueToast).use(router).mount('#app')

import "bootstrap/dist/js/bootstrap.js";