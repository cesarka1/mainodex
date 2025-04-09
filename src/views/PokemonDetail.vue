<template>
  <div class="pokemon-detail">
    <button class="back-btn" @click="$emit('back')">← Voltar</button>

    <div class="detail-card">
      <img :src="pokemon.image" alt="pokemon" class="pokemon-image" />
      <h2 class="pokemon-name">{{ formatName(pokemon.name) }}</h2>
      <PokemonTabs :pokemon="pokemon" />
      <!-- <ul class="pokemon-types">
        <li v-for="type in pokemon.types" :key="type" class="type">
          {{ type }}
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script setup>
import PokemonTabs from "../components/detail/PokemonTabs.vue";
import { formatName } from "../utils/pokemonUtils";

defineProps({
  pokemon: Object,
});
</script>

<style scoped>
.pokemon-detail {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
}

.back-btn {
  align-self: flex-start;
  margin-bottom: 1rem;
  margin-left: 5vw;
  /* background: #eee; */
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.detail-card {
  background: white;

  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 80vw;
}

.pokemon-image {
  height: 15rem;
  object-fit: contain;
}

.pokemon-name {
  text-transform: capitalize;
  font-size: 1.5rem;
  margin-top: 1rem;
}

.pokemon-types {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
}

.type {
  background: #f2f2f2;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  text-transform: capitalize;
}
</style>
