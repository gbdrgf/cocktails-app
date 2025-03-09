import { describe, it, expect, vi } from 'vitest'
import { fetchCocktailsByCode } from '@/services/api'

vi.mock('axios')
import axios from 'axios'

describe('API: fetchCocktailsByCode', () => {
  it('должен загружать коктейли по коду', async () => {
    axios.get.mockResolvedValue({
      data: { drinks: [{ idDrink: '11000', strDrink: 'Mojito' }] },
    })

    const result = await fetchCocktailsByCode('mojito')

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ idDrink: '11000', strDrink: 'Mojito' }),
      ]),
    )
  })

  it('должен возвращать пустой массив, если API вернул null', async () => {
    axios.get.mockResolvedValue({
      data: { drinks: null },
    })

    const result = await fetchCocktailsByCode('mojito')

    expect(result).toEqual([])
  })

  it('должен выбрасывать ошибку при пустом коде', async () => {
    await expect(fetchCocktailsByCode('')).rejects.toThrow(
      'Cocktail code is required',
    )
  })

  it('должен выбрасывать ошибку при сбое сети', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    axios.get.mockRejectedValue(new Error('Network error'))

    await expect(fetchCocktailsByCode('mojito')).rejects.toThrow(
      'API request failed',
    )
  })
})
