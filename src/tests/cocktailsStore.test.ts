import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCocktailsStore } from '@/store/cocktails'
import { fetchCocktailsByCode } from '@/services/api'

beforeEach(() => {
  setActivePinia(createPinia())
})

vi.mock('@/services/api', () => ({
  fetchCocktailsByCode: vi.fn(),
}))

describe('Cocktails Store', () => {
  it('должен иметь начальное состояние', () => {
    const store = useCocktailsStore()
    expect(store.activeCocktailCode).toBe('margarita')
    expect(store.cocktailsCache).toEqual({})
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('должен изменять активный коктейль', () => {
    const store = useCocktailsStore()
    store.setActiveCocktail('mojito')
    expect(store.activeCocktailCode).toBe('mojito')
  })

  it('должен загружать данные коктейля', async () => {
    const store = useCocktailsStore()
    fetchCocktailsByCode.mockResolvedValue([
      { idDrink: '11000', strDrink: 'Mojito' },
    ])

    await store.loadCocktailData('mojito')

    expect(store.cocktailsCache.mojito).toEqual([
      { idDrink: '11000', strDrink: 'Mojito' },
    ])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('должен обрабатывать ошибку при загрузке', async () => {
    const store = useCocktailsStore()
    fetchCocktailsByCode.mockRejectedValue(new Error('Ошибка загрузки'))

    await store.loadCocktailData('mojito')

    expect(store.error).toEqual(expect.stringContaining('Ошибка загрузки'))
    expect(store.isLoading).toBe(false)
  })
})
