<script setup>
import { ref, computed } from "vue";
import PokemonList from "../components/PokemonList.vue";
import HeaderList from "../components/HeaderList.vue";
import PokemonFilter from "../components/PokemonFilter.vue";

const emit = defineEmits(["toggle-audio"]);
const filterQuery = ref("");
const filterType = ref("");

const filters = computed(() => ({
  query: filterQuery.value,
  type: filterType.value,
}));

const handleMute = (value) => {
  emit("toggle-audio", value);
};

const handleFilterChange = ({ query, type }) => {
  filterQuery.value = query;
  filterType.value = type;
};
</script>

<template>
  <div class="pokelist">
    <HeaderList @toggle-audio="handleMute" />
    <PokemonFilter @filter-changed="handleFilterChange" />
    <PokemonList :filters="filters" />
  </div>
</template>

<style scoped>
.pokelist {
  background: #f3f4f6;
  min-height: 100vh;
  min-width: 100vw;
}
</style>
