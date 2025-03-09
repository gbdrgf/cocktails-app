import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCocktailsStore } from '@/store/cocktails'
import { fetchCocktailsByCode } from '@/services/api'

beforeEach(() => {
  setActivePinia(createPinia())
  vi.clearAllMocks()
})

vi.mock('@/services/api', () => ({
  fetchCocktailsByCode: vi.fn(),
}))

describe('Cocktails Store', () => {
  it('должен иметь начальное состояние', () => {
    const store = useCocktailsStore()
    expect(store.cocktailsCache).toEqual({})
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('должен загружать данные коктейля', async () => {
    const store = useCocktailsStore()
    fetchCocktailsByCode.mockResolvedValue([
      { idDrink: '11000', strDrink: 'Mojito' },
    ])

    await store.loadCocktailData('mojito')

    expect(store.cocktailsCache).toHaveProperty('mojito')
    expect(store.cocktailsCache.mojito).toEqual([
      { idDrink: '11000', strDrink: 'Mojito' },
    ])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('не должен повторно загружать данные, если они уже есть', async () => {
    const store = useCocktailsStore()

    store.cocktailsCache = {
      ...store.cocktailsCache,
      mojito: [{ idDrink: '11000', strDrink: 'Mojito' }],
    }

    await store.loadCocktailData('mojito')

    expect(fetchCocktailsByCode).not.toHaveBeenCalled()
  })

  it('должен обрабатывать ошибку при загрузке', async () => {
    const store = useCocktailsStore()
    fetchCocktailsByCode.mockRejectedValue(new Error('Ошибка загрузки'))

    await store.loadCocktailData('mojito')

    expect(store.error).toContain('Ошибка загрузки')
    expect(store.isLoading).toBe(false)
  })

  it('должен правильно определять наличие данных', async () => {
    const store = useCocktailsStore()

    expect(store.hasCocktailData('mojito').value).toBe(false)

    store.cocktailsCache = {
      ...store.cocktailsCache,
      mojito: [{ idDrink: '11000', strDrink: 'Mojito' }],
    }

    expect(store.hasCocktailData('mojito').value).toBe(true)
  })

  it('должен возвращать пустой массив, если коктейля нет', () => {
    const store = useCocktailsStore()

    expect(store.getCocktailVariants('mojito').value).toEqual([])
  })
})
