<template>
  <div class="cocktail-page">
    <h1 class="cocktail-page__title">{{ cocktailCode }}</h1>

    <p v-if="cocktailsStore.isLoading" class="cocktail-page__loading">
      Загрузка...
    </p>
    <p v-if="cocktailsStore.error" class="cocktail-page__error">
      {{ cocktailsStore.error }}
    </p>
    <p
      v-if="!hasCocktailData && !cocktailsStore.isLoading"
      class="cocktail-page__no-data"
    >
      Нет данных для этого коктейля.
    </p>

    <div v-if="hasCocktailData" class="cocktail-page__list">
      <CocktailCard
        v-for="cocktail in activeCocktails"
        :key="cocktail.idDrink"
        :cocktail="cocktail"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCocktailsStore } from '@/store/cocktails'
import CocktailCard from '@/components/CocktailCard.vue'
import { COCKTAIL_CODES } from '@/config'

const cocktailsStore = useCocktailsStore()
const route = useRoute()

const cocktailCode = ref(
  (route.params.cocktailCode as string) || COCKTAIL_CODES[0],
)

const activeCocktails = cocktailsStore.getCocktailVariants(cocktailCode.value)
const hasCocktailData = cocktailsStore.hasCocktailData(cocktailCode.value)

onMounted(() => cocktailsStore.loadCocktailData(cocktailCode.value))
</script>

<style scoped>
@import '@/assets/styles/cocktails.scss';
</style>
