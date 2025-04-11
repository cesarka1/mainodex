<template>
  <div class="about-section" v-if="isReady">
    <!-- Card de estatísticas -->
    <div class="info-grid">
      <div class="info-card">
        <div class="info-icon">
          <i class="bi bi-sort-numeric-up"></i>
        </div>
        <h3>Order</h3>
        <p>#{{ pokemon.order }}</p>
      </div>
      <div class="info-card">
        <div class="info-icon">
          <i class="bi bi-star-fill"></i>
        </div>
        <h3>Base Experience</h3>
        <p>{{ pokemon.base_experience }}</p>
      </div>
      <div class="info-card">
        <div class="info-icon">
          <i class="bi bi-arrows-vertical"></i>
        </div>
        <h3>Height</h3>
        <p>{{ pokemon.height / 10 }} m</p>
      </div>
      <div class="info-card">
        <div class="info-icon">
          <i class="bi bi-speedometer2"></i>
        </div>
        <h3>Weight</h3>
        <p>{{ pokemon.weight / 10 }} kg</p>
      </div>
    </div>

    <!-- Seção de tipos -->
    <div class="section-container">
      <h3 class="section-title">
        <i class="bi bi-tags-fill"></i>
        Types
      </h3>
      <div class="types-list">
        <type-badge v-for="type in getPokemonTypes" :key="type" :type="type" />
      </div>
    </div>

    <!-- Seção de jogos -->
    <div class="section-container">
      <h3 class="section-title">
        <i class="bi bi-controller"></i>
        Game Appearances
      </h3>
      <div class="games-counter">
        <span class="counter-badge"
          >{{ pokemon.game_indices.length }} Games</span
        >
      </div>
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
  </div>
</template>

<script setup>
import { computed } from "vue";
import TypeBadge from "../TypeBadge.vue";

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

const getPokemonTypes = computed(() => {
  if (!props.pokemon || !props.pokemon.types) return [];
  return props.pokemon.types.map((typeInfo) => typeInfo.type.name);
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
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.info-card {
  background-color: #f9fafb;
  padding: 1.5rem 1.2rem;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-top: 3px solid #fc504c;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12);
}

.info-icon {
  font-size: 1.5rem;
  color: #fc504c;
  margin-bottom: 0.75rem;
}

.info-card h3 {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.info-card p {
  font-size: 1.35rem;
  color: #111827;
  font-weight: 700;
}

.section-container {
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  position: relative;
}

.section-title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  color: #374151;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(252, 80, 76, 0.3);
}

.section-title i {
  color: #fc504c;
}

.types-list {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 0.75rem;
}

.games-counter {
  margin-bottom: 1rem;
}

.counter-badge {
  display: inline-block;
  padding: 0.3rem 0.75rem;
  background-color: rgba(252, 80, 76, 0.15);
  color: #fc504c;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 600;
}

.game-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.game-card {
  background-color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  color: #374151;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;
}

.game-card:hover {
  background-color: #fc504c;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .about-section {
    max-width: 95vw;
  }

  .info-grid {
    gap: 1rem;
  }
}
</style>
