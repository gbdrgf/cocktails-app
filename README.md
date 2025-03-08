# Cocktails App

Проект реализован на **Vue 3 + TypeScript**, с менеджером состояния **Pinia** и сборкой **Vite**.

## Описание

- **Функциональность**:
  - Получаем данные о коктейлях с публичного API: [TheCocktailDB](https://www.thecocktaildb.com/api.php).
  - Для каждого cocktail_code (`margarita`, `mojito`, `a1`, `kir`) выводим все варианты коктейлей.
  - Lazy-loading изображений.
  - При заходе на `/` происходит редирект на `/margarita`.
  - При несуществующем адресе — страница 404.
