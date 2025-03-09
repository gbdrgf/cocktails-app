<template>
  <div class="not-found">
    <h1 class="not-found__title">Страница не найдена</h1>
    <p class="not-found__message">
      Запрашиваемая страница не существует или была удалена.
    </p>
    <router-link to="/" class="not-found__link"
      >Вернуться на главную</router-link
    >
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@import '@/assets/styles/notfound.scss';
</style>
