<template>
  <div class="pokelist">
    <HeaderList />
    filtro
    <PokemonList />
  </div>
</template>

<script>
import PokemonList from "../components/PokemonList.vue";
import HeaderList from "../components/HeaderList.vue";

export default {
  name: "PokemonView",
  components: {
    PokemonList,
    HeaderList,
  },
};
</script>

<style scoped>
.pokelist {
  background: #f3f4f6;
}
</style>
