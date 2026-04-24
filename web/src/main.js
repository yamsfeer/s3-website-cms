/**
 * 万家官网管家 - 前台官网入口
 * Vue 3 + Vue Router + Axios
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
