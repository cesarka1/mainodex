<script setup>
import { ref, computed } from "vue";
import PokemonList from "../components/PokemonList.vue";
import HeaderList from "../components/HeaderList.vue";
import PokemonFilter from "../components/PokemonFilter.vue";
import PokemonDetail from "./PokemonDetail.vue";

const emit = defineEmits(["toggle-audio"]);
const filterQuery = ref("");
const filterType = ref("");
const showDetail = ref(false);
const selectedPokemon = ref(null);

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

const handleShowDetail = (pokemon) => {
  selectedPokemon.value = pokemon;
  showDetail.value = true;
};

const handleBackToList = () => {
  showDetail.value = false;
  selectedPokemon.value = null;
};
</script>

<template>
  <div class="pokelist">
    <HeaderList @toggle-audio="handleMute" />
    <div v-show="!showDetail">
      <PokemonFilter @filter-changed="handleFilterChange" />
      <PokemonList :filters="filters" @card-clicked="handleShowDetail" />
    </div>
    <div v-if="showDetail">
      <PokemonDetail :pokemon="selectedPokemon" @back="handleBackToList" />
    </div>
  </div>
</template>

<style scoped>
.pokelist {
  background: #f3f4f6;
  min-height: 100vh;
  min-width: 100vw;
}
</style>
