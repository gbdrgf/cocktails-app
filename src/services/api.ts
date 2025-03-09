import axios from 'axios'
import type { Cocktail } from '@/types/cocktail'
import { API_URL } from '../config'

export async function fetchCocktailsByCode(code: string): Promise<Cocktail[]> {
  if (!code) {
    throw new Error('Cocktail code is required')
  }

  try {
    const { data } = await axios.get<{ drinks: Cocktail[] | null }>(
      `${API_URL}${encodeURIComponent(code)}`,
    )
    return data.drinks ?? []
  } catch {
    throw new Error('API request failed')
  }
}
