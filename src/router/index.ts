import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      redirect: '/market',
      children: [
        { path: 'market', name: 'market', component: () => import('@/views/MarketView.vue') },
        {
          path: 'portfolio',
          name: 'portfolio',
          component: () => import('@/views/PortofolioView.vue'),
        },
        { path: 'signals', name: 'signals', component: () => import('@/views/SignalsView.vue') },
      ],
    },
  ],
})

export default router
