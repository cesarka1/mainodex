<template>
  <div class="pokemon-card" @click="$emit('card-clicked', pokemon.name)">
    <div class="pokemon-header">
      <h2 class="pokemon-name">{{ pokemon.name }}</h2>
      <span class="pokemon-id">#{{ formatId(pokemon.id) }}</span>
    </div>
    <div class="pokemon-image-container">
      <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
    </div>
    <p class="pokemon-description">{{ pokemon.types }}</p>
  </div>
</template>

<script>
export default {
  name: "PokemonCard",
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
    formatId(id) {
      return String(id).padStart(3, "0");
    },
  },
};
</script>

<style scoped>
.pokemon-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 256px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  text-transform: capitalize;
}

.pokemon-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.pokemon-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.pokemon-name {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
  color: black;
}

.pokemon-id {
  color: #6b7280;
  font-size: 0.875rem;
}

.pokemon-image-container {
  display: flex;
  justify-content: center;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.pokemon-image {
  height: 128px;
  width: 128px;
  object-fit: contain;
}

.pokemon-description {
  color: #4b5563;
  font-size: 0.875rem;
  margin: 0;
}
</style>
