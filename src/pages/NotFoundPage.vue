<template>
  <div>
    <h1>Страница не найдена</h1>
    <p>Запрашиваемая страница не существует или была удалена.</p>
    <router-link to="/">Вернуться на главную</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFoundPage',
})
</script>
