<template>
  <aside class="sidebar">
    <nav>
      <button
        v-for="cocktail in COCKTAIL_CODES"
        :key="cocktail"
        class="nav-link"
        :class="{ active: cocktailsStore.activeCocktailCode === cocktail }"
        @click="cocktailsStore.setActiveCocktail(cocktail)"
      >
        {{ cocktail }}
      </button>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useCocktailsStore } from '@/store/cocktails'
import { COCKTAIL_CODES } from '@/config'

const cocktailsStore = useCocktailsStore()
</script>

<style scoped>
@import '@/assets/styles/sidebar.scss';
</style>
