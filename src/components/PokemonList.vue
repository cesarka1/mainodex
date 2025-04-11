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
      debounceTimer: null,
      notFoundMessage: "",
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
        this.filterLocally();
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
          this.applyFilters();
        }, 1000);
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

      let filtered = this.pokemons;

      if (!query && !type) {
        this.pokemons = [...this.loadedPokemons];
        this.isLoading = false;
        return;
      }

      let matchedPokemons = [];
      if (query !== "") {
        this.isLoading = true;
        if (!isNaN(query)) {
          try {
            const pokemon = await getPokemonByNameOrId(query);
            console.log("Por ID");
            console.log("this.pokemon", this.pokemons);
            if (this.pokemons.length === 0) matchedPokemons = [pokemon];
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
      if (matchedPokemons[0] === null || matchedPokemons.length === 0) {
        this.isLoading = false;
        if (filtered.length === 0) {
          this.notFoundMessage =
            "Não encontrado ou termo digitado de forma incompleta!";
        }
        return filtered;
      }
      if (type && matchedPokemons.length > 0) {
        matchedPokemons = matchedPokemons.filter((p) =>
          p.types.map((t) => t.toLowerCase()).includes(type)
        );
      }
      console.log("matchedPokemons", matchedPokemons);
      this.pokemons = matchedPokemons;
      this.notFoundMessage =
        matchedPokemons.length === 0
          ? "Não encontrado ou termo digitado de forma incompleta!"
          : "";
    },
    filterLocally() {
      const query = this.filters?.query?.toLowerCase() || "";
      const type = this.filters?.type?.toLowerCase() || "";

      let filtered = [...this.loadedPokemons];

      if (query) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.id.toString().includes(query)
        );
      }

      if (type) {
        filtered = filtered.filter((p) =>
          p.types.map((t) => t.toLowerCase()).includes(type)
        );
      }

      this.pokemons = filtered;
      if (filtered.length === 0) {
        this.notFoundMessage = "Carregando...";
      } else {
        this.notFoundMessage = "";
      }
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
  <div v-if="notFoundMessage" class="not-found-message">
    {{ notFoundMessage }}
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
.not-found-message {
  text-align: center;
  font-size: 1.2rem;
  color: red;
  padding: 20px;
}
</style>
