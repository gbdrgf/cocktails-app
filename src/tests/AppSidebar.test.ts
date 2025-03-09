import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Sidebar from '@/components/AppSidebar.vue'
import { createTestingPinia } from '@pinia/testing'
import { useCocktailsStore } from '@/store/cocktails'

describe('Sidebar.vue', () => {
  it('отображает список коктейлей', () => {
    const wrapper = mount(Sidebar, {
      global: {
        plugins: [createTestingPinia()],
      },
    })

    expect(wrapper.findAll('.nav-link')).toHaveLength(4) // margarita, mojito, a1, kir
  })

  it('меняет активный коктейль при клике', async () => {
    const pinia = createTestingPinia({ stubActions: false })
    const wrapper = mount(Sidebar, {
      global: {
        plugins: [pinia],
      },
    })

    const store = useCocktailsStore()
    const buttons = wrapper.findAll('.nav-link')

    await buttons[1].trigger('click') // Кликаем на mojito
    expect(store.activeCocktailCode).toBe('mojito')
    expect(buttons[1].classes()).toContain('active')
  })
})
