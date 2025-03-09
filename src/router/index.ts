import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import CocktailsPage from '@/pages/CocktailsPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        redirect: 'margarita',
      },
      {
        path: 'margarita',
        name: 'margarita',
        component: CocktailsPage,
      },
      {
        path: 'mojito',
        name: 'mojito',
        component: CocktailsPage,
      },
      {
        path: 'a1',
        name: 'a1',
        component: CocktailsPage,
      },
      {
        path: 'kir',
        name: 'kir',
        component: CocktailsPage,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
