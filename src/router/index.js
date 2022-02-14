import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Settings from '@/views/UserSettings.vue'
import Registration from '@/views/Registration.vue'
import Token from '@/views/Token.vue'
import SignIn from '@/views/SignIn.vue'
import PasswordRecovery from '@/views/PasswordRecovery.vue'

const routes = [
  { path: '/:tag(.*)', component: Home },

  { path: '/:tag(.*)/settings', component: Settings },

  { path: '/registration', component: Registration },

  { path: '/token-:tag(.*)', component: Token },

  { path: '/signin', component: SignIn },

  { path: '/password-recovery', component: PasswordRecovery },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
