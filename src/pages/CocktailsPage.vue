<template>
  <div class="cocktail-page">
    <h1 class="cocktail-title">{{ cocktailsStore.activeCocktailCode }}</h1>

    <p v-if="cocktailsStore.isLoading" class="loading">Загрузка...</p>
    <p v-if="cocktailsStore.error" class="error">{{ cocktailsStore.error }}</p>
    <p
      v-if="!cocktailsStore.hasActiveCocktailData && !cocktailsStore.isLoading"
      class="no-data"
    >
      Нет данных для этого коктейля.
    </p>

    <div v-if="cocktailsStore.hasActiveCocktailData" class="cocktail-list">
      <CocktailCard
        v-for="cocktail in cocktailsStore.activeCocktailVariants"
        :key="cocktail.idDrink"
        :cocktail="cocktail"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCocktailsStore } from '@/store/cocktails'
import CocktailCard from '@/components/CocktailCard.vue'
import { onMounted } from 'vue'

const cocktailsStore = useCocktailsStore()

onMounted(async () => {
  await cocktailsStore.loadCocktailData(cocktailsStore.activeCocktailCode)
})
</script>

<style scoped>
@import '@/assets/styles/cocktails.scss';
</style>
