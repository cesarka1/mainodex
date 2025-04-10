<template>
  <div class="moves-section" v-if="moves.length">
    <ul class="move-list">
      <li v-for="(move, index) in moves" :key="index">
        <strong>{{ formatMoveName(move.name) }}</strong
        ><br />
        <small>Learned at level: {{ move.level }}</small
        ><br />
        <small>Method: {{ formatName(move.method) }}</small
        ><br />
        <small>Version: {{ move.version }}</small>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatName } from "/src/utils/pokemonUtils.js";
const props = defineProps({
  pokemon: Object,
});

const moves = computed(() => {
  const moveList = props.pokemon?.moves || [];
  console.log(moveList);
  return moveList.map((moveEntry) => {
    const name = moveEntry.move.name;

    const firstDetail = moveEntry.version_group_details[0] || {};

    return {
      name,
      level: firstDetail.level_learned_at ?? "-",
      method: firstDetail.move_learn_method?.name || "unknown",
      version: firstDetail.version_group?.name || "unknown",
    };
  });
});

const formatMoveName = (name) => {
  return name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};
</script>

<style scoped>
.moves-section {
  margin-top: 2rem;
}

.move-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 2rem 0;
  max-width: 70vw;
  gap: 1.5rem;
  justify-content: center;
}

.move-list li {
  margin-bottom: 1rem;
  padding: 0.5rem;
  min-width: 300px;
  text-align: center;
  background-color: rgb(249 250 251);
}
</style>
