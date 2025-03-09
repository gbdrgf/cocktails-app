import axios from 'axios'
import type { Cocktail } from '@/types/cocktail'

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

export async function fetchCocktailsByCode(code: string): Promise<Cocktail[]> {
  if (!code) {
    throw new Error('Cocktail code is required')
  }

  try {
    const response = await axios.get<{ drinks: Cocktail[] | null }>(
      `${API_URL}${encodeURIComponent(code)}`,
    )

    return response.data.drinks ?? []
  } catch (error) {
    console.error('Error fetching cocktails:', error)
    throw new Error('API request failed')
  }
}
