<template>
  <div class="evolution-chain" v-if="chain.length">
    <div class="evolution-line">
      <template v-for="(stage, index) in chain" :key="stage.species_name">
        <div class="evolution-stage">
          <img
            :src="stage.image"
            :alt="stage.species_name"
            class="pokemon-image"
          />
          <div class="pokemon-name">{{ formatName(stage.species_name) }}</div>
        </div>

        <div v-if="index < flattenedChain.length - 1" class="evolution-arrow">
          <div class="evolution-method">
            {{ formatTrigger(flattenedChain[index + 1].details) }}
          </div>
          <span class="arrow-icon"></span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  pokemon: Object,
});

// Flattens the nested chain into a linear array for display
const chain = computed(() => props.pokemon?.evolution_chain || []);
console.log("Evoluções", chain.value);

const flattenedChain = computed(() => {
  return chain.value.map((stage) => ({
    species_name: stage.species_name,
    image: stage.image,
    details: {
      trigger: stage.trigger,
      min_level: stage.min_level,
      item: stage.item,
    },
  }));
});
console.log("Flatted", flattenedChain.value);

const formatName = (name) => {
  return name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

const formatTrigger = (details) => {
  if (!details) return "Unknown";

  if (details.trigger === "level-up") {
    return details.min_level ? `Level ${details.min_level}` : "Level up";
  } else if (details.trigger === "use-item") {
    return `Item: ${formatName(details.item)}`;
  } else if (details.trigger === "trade") {
    return "Trade";
  }

  return formatName(details.trigger);
};
</script>

<style scoped>
.evolution-chain {
  margin-top: 2rem;
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.evolution-line {
  display: flex;
  flex-direction: column; /* Mobile first: em coluna */
  align-items: center;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .evolution-line {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .evolution-arrow {
    flex-direction: row;
    gap: 0.5rem;
  }

  .arrow-icon {
    margin-top: 0;
    margin-left: 0.5rem;
  }
}

.evolution-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.pokemon-image {
  width: 96px;
  height: 96px;
  image-rendering: pixelated;
}

.pokemon-name {
  font-weight: bold;
  text-transform: capitalize;
  color: #333;
}

.evolution-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.85rem;
  color: #7c4700;
  text-align: center;
}

.arrow-icon {
  font-size: 1.5rem;
  margin-top: 0.25rem;
}

.arrow-icon::before {
  content: "⬇";
}

@media (min-width: 768px) {
  .arrow-icon::before {
    content: "➡";
  }
}
</style>
