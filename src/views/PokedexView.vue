<script setup>
import PokemonList from "../components/PokemonList.vue";
import HeaderList from "../components/HeaderList.vue";
import PokemonFilter from "../components/PokemonFilter.vue";
const emit = defineEmits(["toggle-audio"]);

const handleMute = (value) => {
  emit("toggle-audio", value);
};
</script>

<template>
  <div class="pokelist">
    <HeaderList @toggle-audio="handleMute" />
    <PokemonFilter @filter-changed="handleFilterChange" />
    <PokemonList />
  </div>
</template>

<style scoped>
.pokelist {
  background: #f3f4f6;
}
</style>
