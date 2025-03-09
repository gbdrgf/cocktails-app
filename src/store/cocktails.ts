import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchCocktailsByCode } from '@/services/api'
import type { Cocktail } from '@/types'

export const useCocktailsStore = defineStore('cocktails', () => {
  const cocktailsCache = ref<Record<string, Cocktail[]>>({})
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  async function loadCocktailData(cocktailCode: string) {
    if (cocktailsCache.value[cocktailCode]) {
      return
    }

    isLoading.value = true
    error.value = null

    try {
      cocktailsCache.value[cocktailCode] =
        await fetchCocktailsByCode(cocktailCode)
    } catch (err) {
      error.value = `Failed to load cocktail data: ${err}`
    } finally {
      isLoading.value = false
    }
  }

  const getCocktailVariants = (cocktailCode: string) =>
    computed(() => cocktailsCache.value[cocktailCode] || [])

  const hasCocktailData = (cocktailCode: string) =>
    computed(() => (cocktailsCache.value[cocktailCode]?.length || 0) > 0)

  return {
    cocktailsCache,
    error,
    isLoading,
    loadCocktailData,
    getCocktailVariants,
    hasCocktailData,
  }
})
