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
      offset: 0,
      limit: 12,
      isLoading: false,
    };
  },
  async mounted() {
    await this.loadMorePokemons();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    async loadMorePokemons() {
      if (this.isLoading) return;

      this.isLoading = true;
      const newPokemons = await getPokemons(this.limit, this.offset);
      this.pokemons.push(...newPokemons);
      this.offset += this.limit;
      this.isLoading = false;
    },
    handleScroll() {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottomOfWindow) {
        this.loadMorePokemons();
      }
    },
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
