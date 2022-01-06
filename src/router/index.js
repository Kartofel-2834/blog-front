import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Registration from '@/views/Registration.vue'
import Token from '@/views/Token.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
  },

  {
    path: '/token',
    name: 'Token',
    component: Token,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
