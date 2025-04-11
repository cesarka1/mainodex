<template>
  <div class="pokemon-detail">
    <button class="back-btn" @click="$emit('back')">
      <i class="bi bi-arrow-left"></i> Voltar
    </button>

    <div class="detail-card">
      <div class="pokemon-header">
        <div class="pokemon-id">#{{ formatId(pokemon.id) }}</div>
        <h2 class="pokemon-name">{{ formatName(pokemon.name) }}</h2>
        
        <div class="pokemon-types" v-if="pokemon.types && pokemon.types.length">
          <type-badge 
            v-for="type in getTypes(pokemon.types)" 
            :key="type" 
            :type="type"
          />
        </div>
      </div>
      
      <div class="pokemon-image-container">
        <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
      </div>
      
      <PokemonTabs :pokemon="fullPokemon" />
    </div>
  </div>
</template>

<script setup>
import PokemonTabs from "../components/detail/PokemonTabs.vue";
import TypeBadge from "../components/TypeBadge.vue";
import { formatName, formatId } from "../utils/pokemonUtils";
import { ref, onMounted } from "vue";
import { getPokemonWithEvolutions } from "../services/PokemonService.js";

const props = defineProps({
  pokemon: Object,
});

const fullPokemon = ref(props.pokemon);

onMounted(async () => {
  if (!props.pokemon.evolution_chain) {
    fullPokemon.value = await getPokemonWithEvolutions(props.pokemon.name);
    console.log(fullPokemon.value);
  }
});

const getTypes = (types) => {
  if (typeof types === 'string') {
    return types.split(',').map(type => type.trim());
  }
  return Array.isArray(types) ? types : [];
};
</script>

<style scoped>
.pokemon-detail {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
}

.back-btn {
  align-self: flex-start;
  margin-bottom: 1.5rem;
  margin-left: 5vw;
  background: #f8f9fa;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.back-btn:hover {
  background: #e9ecef;
  transform: translateX(-3px);
}

.detail-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 90%;
  max-width: 900px;
  overflow: hidden;
}

.pokemon-header {
  padding: 1.5rem;
  position: relative;
  background: linear-gradient(to bottom, #fc504c 0%, #e74c3c 100%);
  color: white;
}

.pokemon-id {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  opacity: 0.8;
}

.pokemon-name {
  text-transform: capitalize;
  font-size: 2rem;
  margin: 0.5rem 0 1rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.pokemon-types {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1rem;
}

.pokemon-image-container {
  padding: 2rem;
  background-color: #f8f9fa;
  position: relative;
}

.pokemon-image {
  height: 200px;
  width: 200px;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  transition: transform 0.3s ease;
}

.pokemon-image:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .pokemon-detail {
    padding: 1rem;
  }
  
  .detail-card {
    width: 95%;
  }
  
  .back-btn {
    margin-left: 2vw;
  }
  
  .pokemon-name {
    font-size: 1.75rem;
  }
  
  .pokemon-image {
    height: 160px;
    width: 160px;
  }
}
</style>