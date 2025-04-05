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

<script>
import PokemonCard from "../components/PokemonCard.vue";

export default {
  name: "PokemonList",
  components: {
    PokemonCard,
  },
  data() {
    return {
      pokemons: [
        {
          id: 1,
          name: "Bulbasaur",
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
          description:
            "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
        },
        {
          id: 4,
          name: "Charmander",
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
          description:
            "From the time it is born, a flame burns at the tip of its tail. Its life would end if the flame were to go out.",
        },
        {
          id: 7,
          name: "Squirtle",
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
          description:
            "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
        },
      ],
    };
  },
  methods: {
    handleCardClick(pokemonName) {
      console.log(`You clicked on ${pokemonName}!`);
      alert(`You clicked on ${pokemonName}!`);
    },
  },
};
</script>

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
