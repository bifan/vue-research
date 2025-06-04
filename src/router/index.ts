import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/ResearchView.vue'),
    },
    {
      path: '/research',
      name: 'research',
      component: () => import('../views/ResearchView.vue'),
    },
  ],
})

export default router
