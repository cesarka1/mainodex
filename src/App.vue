<script setup>
import PokedexView from "./views/PokedexView.vue";
import IntroScreen from "./views/IntroScreen.vue";
import { onMounted } from "vue";
import { ref } from "vue";
const showPokedex = ref(false);
</script>

<template>
  <IntroScreen
    v-show="!showPokedex"
    :PokedexShow="() => (showPokedex = true)"
  />

  <PokedexView v-if="showPokedex" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
