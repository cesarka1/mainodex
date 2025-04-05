<!-- PokemonView.vue -->
<template>
  <h1>Mainôdex</h1>
  <div>Filtro</div>
  <PokemonList />
</template>

<script>
import PokemonList from "../components/PokemonList.vue";

export default {
  name: "PokemonView",
  components: {
    PokemonList,
  },
};
</script>

<style scoped>
.pokemon-view {
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}
</style>
