<template>
  <div class="app-layout">
    <AppSidebar class="app-layout__sidebar" />
    <main class="app-layout__content">
      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<style scoped>
@import '@/assets/styles/layout.scss';
</style>
