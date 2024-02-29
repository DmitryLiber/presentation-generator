import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { API } from '../utils'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/generate',
      name: 'generate',
      component: () => import('../views/GeneratePdf.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const response = await API.get('')

  if (response) {
    if (to.name !== 'login' && response.status === undefined) {
      return '/login'
    }
    if (to.name !== 'login' && response.status === 401) {
      return '/login'
    }
  }
})

export default router
