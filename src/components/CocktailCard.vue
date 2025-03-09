<template>
  <div class="cocktail-card">
    <h2 class="cocktail-card__title">{{ cocktail.strDrink }}</h2>
    <div class="cocktail-card__content">
      <div class="cocktail-card__info">
        <p><strong>Категория:</strong> {{ cocktail.strCategory }}</p>
        <p><strong>Тип:</strong> {{ cocktail.strAlcoholic }}</p>
        <p><strong>Подача:</strong> {{ cocktail.strGlass }}</p>
        <p><strong>Список ингредиентов:</strong></p>
        <ul class="cocktail-card__ingredients">
          <li v-for="(ingredient, index) in ingredients" :key="index">
            {{ ingredient }}
          </li>
        </ul>
      </div>
      <div class="cocktail-card__image-container">
        <img
          :src="cocktail.strDrinkThumb"
          :alt="cocktail.strDrink"
          loading="lazy"
          class="cocktail-card__image"
        />
      </div>
    </div>
    <div class="cocktail-card__instructions">
      <h3>Рецепт</h3>
      <p>{{ cocktail.strInstructions }}</p>
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
