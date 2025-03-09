<template>
  <aside class="sidebar">
    <nav>
      <router-link
        v-for="cocktail in cocktails"
        :key="cocktail"
        :to="'/' + cocktail"
        class="nav-link"
        active-class="active-link"
      >
        {{ cocktail }}
      </router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Cocktail } from '@/types/cocktails'

const cocktails = ref<Record<string, Cocktail>>({})
</script>

<style scoped>
@import '@/assets/styles/sidebar.scss';
</style>
