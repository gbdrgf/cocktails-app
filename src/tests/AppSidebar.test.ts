import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { mount, flushPromises } from '@vue/test-utils'
import AppLayout from '@/components/AppLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

vi.mock('@/config', () => ({
  COCKTAIL_CODES: ['margarita', 'mojito', 'a1', 'kir'],
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/margarita' },
    { path: '/:cocktailCode', component: { template: '<div />' } },
  ],
})

beforeEach(async () => {
  setActivePinia(createPinia())

  await router.push('/margarita')
  await router.isReady()
})

describe('Sidebar.vue внутри AppLayout', () => {
  it('отображает список коктейлей', async () => {
    const wrapper = mount(AppLayout, {
      global: { plugins: [router] },
    })

    await flushPromises()

    const links = wrapper.findAll('.sidebar__link')
    expect(links).toHaveLength(4)
  })

  it('меняет активный класс при клике на новый пункт', async () => {
    const wrapper = mount(AppLayout, {
      global: { plugins: [router] },
    })

    await flushPromises()

    const links = wrapper.findAll('.sidebar__link')

    expect(links[0].classes()).toContain('sidebar__link--active')

    await links[1].trigger('click')
    await flushPromises()

    expect(links[0].classes()).not.toContain('sidebar__link--active')
    expect(links[1].classes()).toContain('sidebar__link--active')
  })
})
