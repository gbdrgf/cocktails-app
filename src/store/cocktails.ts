import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Cocktail } from '@/types/cocktail'
import { fetchCocktailsByCode } from '@/services/api'
import { COCKTAIL_CODES } from '@/config'

export const useCocktailsStore = defineStore('cocktails', () => {
  const cocktailsCache = ref<Record<string, Cocktail[]>>({})

  const activeCocktailCode = ref<string>(COCKTAIL_CODES[0])

  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  async function loadCocktailData(cocktailCode: string) {
    if (cocktailsCache.value[cocktailCode]) return // Если уже загружали, не дублируем запрос

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

  async function setActiveCocktail(cocktailCode: string) {
    if (
      COCKTAIL_CODES.includes(cocktailCode) &&
      activeCocktailCode.value !== cocktailCode
    ) {
      activeCocktailCode.value = cocktailCode
      await loadCocktailData(cocktailCode)
    }
  }

  const activeCocktailVariants = computed(
    () => cocktailsCache.value[activeCocktailCode.value] || [],
  )

  const hasActiveCocktailData = computed(
    () => activeCocktailVariants.value.length > 0,
  )

  return {
    cocktailsCache,
    activeCocktailCode,
    error,
    isLoading,
    loadCocktailData,
    setActiveCocktail,
    activeCocktailVariants,
    hasActiveCocktailData,
  }
})
