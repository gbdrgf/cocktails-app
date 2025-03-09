import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CocktailCard from '@/components/CocktailCard.vue'

describe('CocktailCard.vue', () => {
  const mockCocktail = {
    idDrink: '11000',
    strDrink: 'Mojito',
    strCategory: 'Cocktail',
    strAlcoholic: 'Alcoholic',
    strGlass: 'Highball glass',
    strDrinkThumb: 'https://example.com/mojito.jpg',
    strInstructions: 'Mix and serve.',
    strIngredient1: 'Rum',
    strMeasure1: '50ml',
  }

  it('отображает название коктейля', () => {
    const wrapper = mount(CocktailCard, {
      props: { cocktail: mockCocktail },
    })

    expect(wrapper.text()).toContain('Mojito')
  })

  it('отображает изображение с lazy-loading', () => {
    const wrapper = mount(CocktailCard, {
      props: { cocktail: mockCocktail },
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/mojito.jpg')
    expect(img.attributes('loading')).toBe('lazy')
  })
})
