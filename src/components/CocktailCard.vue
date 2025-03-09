<template>
  <div class="cocktail-card">
    <div class="cocktail-content">
      <div class="cocktail-info">
        <h2 class="cocktail-name">{{ cocktail.strDrink }}</h2>
        <p><strong>Категория:</strong> {{ cocktail.strCategory }}</p>
        <p><strong>Тип:</strong> {{ cocktail.strAlcoholic }}</p>
        <p><strong>Подача:</strong> {{ cocktail.strGlass }}</p>
        <h3>Ингредиенты:</h3>
        <ul>
          <li v-for="(ingredient, index) in ingredients" :key="index">
            {{ ingredient }}
          </li>
        </ul>
        <h3>Рецепт:</h3>
        <p>{{ cocktail.strInstructions }}</p>
      </div>
      <div class="cocktail-image-container">
        <img
          :src="cocktail.strDrinkThumb"
          :alt="cocktail.strDrink"
          loading="lazy"
          class="cocktail-image"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Cocktail } from '@/types/cocktails'
import { computed, toRefs } from 'vue'

const props = defineProps<{ cocktail: Cocktail }>()
const { cocktail } = toRefs(props)

const ingredients = computed(() => {
  if (!cocktail.value) return []

  const result: string[] = []

  Object.keys(cocktail.value)
    .filter((key) => key.startsWith('strIngredient'))
    .forEach((key, index) => {
      const measure =
        cocktail.value[`strMeasure${index + 1}` as keyof Cocktail] || ''
      const ingredient = cocktail.value[key as keyof Cocktail]
      if (ingredient) {
        result.push(`${measure} ${ingredient}`.trim())
      }
    })

  return result
})
</script>

<style scoped>
@import '@/assets/styles/cocktail-card.scss';
</style>
