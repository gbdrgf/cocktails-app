import { createRouter, createWebHistory } from 'vue-router'
import CocktailsPage from "../pages/CocktailsPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";

const routes = [
    {
        path: '/',
        redirect: '/margarita',
    },
    {
        path: '/:cocktailCode(margarita|mojito|a1|kir)',
        name: 'cocktail',
        component: CocktailsPage,
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
