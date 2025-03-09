import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import CocktailsPage from '@/pages/CocktailsPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import { COCKTAIL_CODES } from '@/config'

function validateCocktail(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  if (COCKTAIL_CODES.includes(to.params.cocktailCode as string)) {
    next()
  } else {
    next({ name: 'NotFound' })
  }
}

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        redirect: `/${COCKTAIL_CODES[0]}`,
      },
      {
        path: ':cocktailCode',
        name: 'Cocktail',
        component: CocktailsPage,
        props: (route) => ({ cocktailCode: route.params.cocktailCode }),
        beforeEnter: validateCocktail,
      },
      {
        path: ':pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundPage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
