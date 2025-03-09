<template>
  <aside class="sidebar">
    <nav class="sidebar__nav">
      <router-link
        v-for="cocktail in cocktails"
        :key="cocktail"
        :to="`/${cocktail}`"
        class="sidebar__link"
        active-class="sidebar__link--active"
      >
        {{ cocktail }}
      </router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { COCKTAIL_CODES } from '@/config'

const cocktails = COCKTAIL_CODES
</script>

<style scoped>
@import '@/assets/styles/sidebar.scss';
</style>
