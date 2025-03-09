<template>
  <div>
    <h1>{{ store.selectedCocktail }}</h1>
    <p v-if="store.isLoading">Loading...</p>
    <p v-if="store.error" class="error-message">{{ store.error }}</p>

    <ul v-if="store.getSelectedCocktailData.length">
      <li v-for="drink in store.getSelectedCocktailData" :key="drink.idDrink">
        {{ drink.strDrink }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useCocktailsStore } from '@/store/cocktails'

const store = useCocktailsStore()
</script>

<style scoped>
@import '@/assets/styles/cocktails.scss';
</style>
