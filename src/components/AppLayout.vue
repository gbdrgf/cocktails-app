<template>
  <div class="layout">
    <AppSidebar />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<style scoped>
@import '@/assets/styles/layout.scss';
</style>
