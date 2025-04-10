<template>
  <div class="pokemon-card" @click="$emit('card-clicked', pokemon.name)">
    <div class="pokemon-header">
      <h2 class="pokemon-name">{{ formatName(pokemon.name) }}</h2>
      <span class="pokemon-id">#{{ formatId(pokemon.id) }}</span>
    </div>
    <div class="pokemon-image-container">
      <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
    </div>
    <div class="pokemon-types">
      <type-badge v-for="type in pokemon.types" :key="type" :type="type" />
    </div>
  </div>
</template>

<script>
import { formatId, formatName } from "../utils/pokemonUtils";
import TypeBadge from "./TypeBadge.vue";

export default {
  name: "PokemonCard",
  components: {
    TypeBadge,
  },
  props: {
    pokemon: {
      type: Object,
      required: true,
      validator: (pokemon) => {
        return pokemon.name && pokemon.image && pokemon.id;
      },
    },
  },
  methods: {
    formatName,
    formatId,
  },
};
</script>

<style scoped>
.pokemon-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 256px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: capitalize;
  overflow: hidden;
}

.pokemon-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.pokemon-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.pokemon-name {
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0;
  color: #2d3748;
}

.pokemon-id {
  color: #6b7280;
  font-size: 0.95rem;
  font-weight: 600;
}

.pokemon-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f9fafb;
}

.pokemon-image {
  height: 140px;
  width: 140px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.pokemon-card:hover .pokemon-image {
  transform: scale(1.05);
}

.pokemon-types {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
