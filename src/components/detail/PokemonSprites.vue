<template>
  <div class="sprite-section" v-if="pokemon">
    <h3 class="section-title">
      <i class="bi bi-images"></i>
      Sprite Gallery
    </h3>
    
    <div class="sprites">
      <div v-for="(sprite, index) in allSprites" :key="index" class="sprite-card">
        <div class="sprite-image-container">
          <img :src="sprite.url" :alt="formatKey(sprite.key)" />
        </div>
        <p class="sprite-name">{{ formatKey(sprite.key) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  pokemon: Object,
});

const allSprites = computed(() => {
  const sprites = props.pokemon?.sprites || {};
  const urls = [];

  const traverseSprites = (obj, parentKey = "") => {
    for (const key in obj) {
      const value = obj[key];
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof value === "string" && value.startsWith("https")) {
        urls.push({ key: key, url: value });
      } else if (typeof value === "object" && value !== null) {
        traverseSprites(value, newKey);
      }
    }
  };

  traverseSprites(sprites);
  return urls;
});

const formatKey = (key) => {
  return key
    .replace(/\./g, " → ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};
</script>

<style scoped>
.sprite-section {
  padding: 2rem 0;
  max-width: 90vw;
  margin: 0 auto;
  text-align: center;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(252, 80, 76, 0.3);
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.section-title i {
  color: #fc504c;
}

.sprites {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
  justify-content: center;
}

.sprite-card {
  background-color: #f9fafb;
  border-radius: 10px;
  padding: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  text-align: center;
  overflow: hidden;
}

.sprite-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.sprite-image-container {
  background-color: white;
  border-radius: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.sprite-image-container img {
  width: 96px;
  height: 96px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.sprite-card:hover .sprite-image-container img {
  transform: scale(1.1);
}

.sprite-name {
  font-size: 0.9rem;
  color: #4b5563;
  margin: 0.5rem 0 0;
  text-align: center;
  font-weight: 500;
}

@media (max-width: 768px) {
  .sprite-section {
    max-width: 95vw;
  }
  
  .sprites {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
  
  .sprite-image-container {
    height: 100px;
  }
  
  .sprite-image-container img {
    width: 80px;
    height: 80px;
  }
}
</style>