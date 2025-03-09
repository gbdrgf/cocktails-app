<template>
  <aside class="sidebar">
    <nav>
      <button
        v-for="cocktail in store.getCocktailList"
        :key="cocktail"
        class="nav-link"
        :class="{ active: store.selectedCocktail === cocktail }"
        @click="store.setSelectedCocktail(cocktail)"
      >
        {{ cocktail }}
      </button>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useCocktailsStore } from '@/store/cocktails'

const store = useCocktailsStore()
</script>

<style scoped>
@import '@/assets/styles/sidebar.scss';
</style>
