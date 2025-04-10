<template>
  <div class="about-section" v-if="isReady">
    <div class="info-grid">
      <div class="info-card">
        <h3> Base Experience</h3>
        <p>{{ pokemon.base_experience }}</p>
      </div>
      <div class="info-card">
        <h3> Height</h3>
        <p>{{ pokemon.height / 10 }} m</p>
      </div>
      <div class="info-card">
        <h3> Weight</h3>
        <p>{{ pokemon.weight / 10 }} kg</p>
      </div>
      <div class="info-card">
        <h3> Order</h3>
        <p>#{{ pokemon.order }}</p>
      </div>
    </div>

    <h3 class="section-title">🎮 Game Appearances</h3>
    <div class="game-list">
      <div
        v-for="game in pokemon.game_indices"
        :key="game.version.name"
        class="game-card"
      >
        {{ formatName(game.version.name) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  pokemon: Object,
});

const isReady = computed(() => {
  return (
    props.pokemon &&
    props.pokemon.game_indices &&
    props.pokemon.game_indices.length > 0
  );
});

const formatName = (name) => {
  return (
    name?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) ||
    "Unknown"
  );
};
</script>

<style scoped>
.about-section {
  padding: 2rem 0;
  max-width: 80vw;
  margin: 0 auto;
  text-align: center;
}
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-card {
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.info-card h3 {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.info-card p {
  font-size: 1.2rem;
  color: #111827;
  font-weight: 600;
}

.section-title {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: #4b5563;
}

.game-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.game-card {
  background-color: #f3f4f6;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  color: #374151;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}
</style>
