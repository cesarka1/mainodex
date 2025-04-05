<script>
import PokemonCard from "../components/PokemonCard.vue";
import { getPokemons } from "../services/PokemonService";

export default {
  name: "PokemonList",
  components: {
    PokemonCard,
  },
  data() {
    return {
      pokemons: [],
    };
  },
  async mounted() {
    this.pokemons = await getPokemons(12); // quantidade de pokémons que quiser
  },
  methods: {
    handleCardClick(pokemonName) {
      alert(`You clicked on ${pokemonName}!`);
    },
  },
};
</script>

<template>
  <div class="pokemon-view">
    <div class="pokemon-list">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        @card-clicked="handleCardClick"
      />
    </div>
  </div>
</template>

<style scoped>
.pokemon-view {
  padding: 20px;
}

.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
