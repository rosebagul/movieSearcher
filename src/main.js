import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import { createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: HomeView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
const app = createApp(App)

app.use(router)
app.mount('#app')
