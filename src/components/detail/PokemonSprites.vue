<template>
  <div class="sprite-section" v-if="pokemon">
    <!-- <h2>Sprites</h2> -->
    <div class="sprites">
      <div v-for="(sprite, index) in allSprites" :key="index" class="sprite">
        <img :src="sprite.url" :alt="sprite.key" />
        <p>{{ formatKey(sprite.key) }}</p>
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
.sprite-section h2 {
  margin-bottom: 1rem;
}

.sprites {
  display: flex;
  flex-wrap: wrap;
  padding: 2rem 0;
  max-width: 70vw;
  gap: 1.5rem;
  justify-content: center;
}

.sprite {
  text-align: center;
  background-color: rgb(249 250 251);
  min-width: 270px;
}

.sprite img {
  padding-top: 1rem;
  width: 96px;
  height: 96px;
}
</style>
