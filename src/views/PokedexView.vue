<script setup>
import PokemonList from "../components/PokemonList.vue";
import HeaderList from "../components/HeaderList.vue";

const emit = defineEmits(["toggle-audio"]);

const handleMute = (value) => {
  emit("toggle-audio", value);
};
</script>

<template>
  <div class="pokelist">
    <HeaderList @toggle-audio="handleMute" />
    filtro
    <PokemonList />
  </div>
</template>

<style scoped>
.pokelist {
  background: #f3f4f6;
}
</style>
