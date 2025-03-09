import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Cocktail } from '@/types/cocktail'
import { fetchCocktailsByCode } from '@/services/api'

export const useCocktailsStore = defineStore('cocktails', () => {
  const cocktails = ref<Record<string, Cocktail[]>>({})
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)
  const selectedCocktail = ref<string>('margarita')

  async function fetchCocktailData(code: string) {
    if (cocktails.value[code]) return

    isLoading.value = true
    error.value = null

    try {
      cocktails.value[code] = await fetchCocktailsByCode(code)
    } catch (err) {
      error.value = `Failed to load cocktail data: ${err}`
    } finally {
      isLoading.value = false
    }
  }

  async function setSelectedCocktail(code: string) {
    if (selectedCocktail.value !== code) {
      selectedCocktail.value = code
      await fetchCocktailData(code)
    }
  }

  const getSelectedCocktailData = computed(
    () => cocktails.value[selectedCocktail.value] || [],
  )

  const getCocktailList = computed(() => ['margarita', 'mojito', 'a1', 'kir'])

  return {
    cocktails,
    error,
    isLoading,
    selectedCocktail,
    getSelectedCocktailData,
    getCocktailList,
    setSelectedCocktail,
  }
})
