<template>
  <div class="tabs-container">
    <div class="tab-header">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        :class="{ active: activeTab === tab.name }"
        @click="setActiveTab(tab.name)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="tab-content">
      <component :is="currentTabComponent" :pokemon="pokemon" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PokemonSprites from "./PokemonSprites.vue";
import PokemonAbout from "./PokemonAbout.vue";
import PokemonMoves from "./PokemonMoves.vue";
import PokemonEvolutions from "./PokemonEvolutions.vue";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
  defaultTab: {
    type: String,
    default: "about",
  },
});

const emit = defineEmits(["tab-change"]);

const activeTab = ref(props.defaultTab);

const tabs = [
  { name: "about", label: "About", component: PokemonAbout },
  { name: "sprites", label: "Sprites", component: PokemonSprites },
  { name: "moves", label: "Moves", component: PokemonMoves },
  { name: "evolution", label: "Evolution", component: PokemonEvolutions },
];

const currentTabComponent = computed(() => {
  const tab = tabs.find((tab) => tab.name === activeTab.value);
  return tab ? tab.component : null;
});

const setActiveTab = (tabName) => {
  activeTab.value = tabName;
  emit("tab-change", tabName);
};
</script>

<style scoped>
.tabs-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 2rem;
}

.tab-header {
  display: flex;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eaedf0;
}

.tab-header button {
  flex: 1;
  padding: 14px 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: rgb(219, 124, 124);
  transition: all 0.2s ease;
  font-weight: 500;
  outline: none;
}

.tab-header button:hover {
  color: #f72929;
  background-color: #f1f3f5;
}

.tab-header button.active {
  color: #ff0000;
  font-weight: 600;

  position: relative;
}

.tab-header button.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ff0000;
}

.tab-content {
  padding: 16px;
}
</style>
