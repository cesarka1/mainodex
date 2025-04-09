<script>
import PokemonCard from "../components/PokemonCard.vue";
import {
  getPokemons,
  getPokemonByNameOrId,
  getPokemonsBySpecies,
} from "../services/PokemonService";

export default {
  name: "PokemonList",
  components: {
    PokemonCard,
  },
  data() {
    return {
      pokemons: [],
      loadedPokemons: [],
      offset: 0,
      limit: 15,
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
  props: {
    filters: Object,
  },
  watch: {
    filters: {
      async handler() {
        await this.applyFilters();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async loadMorePokemons() {
      if (this.isLoading) return;

      this.isLoading = true;
      const newPokemons = await getPokemons(this.limit, this.offset);
      this.pokemons.push(...newPokemons);
      this.loadedPokemons.push(...newPokemons);
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
    async applyFilters() {
      const query = this.filters?.query?.toLowerCase() || "";
      const type = this.filters?.type?.toLowerCase() || "";
      this.pokemons = [];

      if (!query && !type) {
        this.pokemons = [...this.loadedPokemons];
        this.isLoading = false;
        return;
      }

      let matchedPokemons = [];
      matchedPokemons = [...this.loadedPokemons];
      if (query !== "") {
        this.isLoading = true; //Bloqueia o scroll enquanto filtra
        if (!isNaN(query)) {
          try {
            const pokemon = await getPokemonByNameOrId(query);
            console.log("Por ID");
            matchedPokemons = [pokemon];
          } catch (e) {
            matchedPokemons = [];
            console.log("Erro");
          }
        } else {
          const species = await getPokemonsBySpecies(query);
          if (species.length > 0) {
            console.log("Por Specie");
            matchedPokemons = species;
          } else {
            const singlePokemon = await getPokemonByNameOrId(query);
            matchedPokemons = [singlePokemon];
            console.log("Por Nome");
          }
        }
      }
      if (type && matchedPokemons.length > 0) {
        matchedPokemons = matchedPokemons.filter((p) =>
          p.types.map((t) => t.toLowerCase()).includes(type)
        );
      }

      this.pokemons = matchedPokemons;
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
        @card-clicked="$emit('card-clicked', pokemon)"
      />
    </div>
  </div>
</template>

<style scoped>
.pokemon-view {
  padding: 1rem 4rem;
}

.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  justify-content: center;
}
</style>
