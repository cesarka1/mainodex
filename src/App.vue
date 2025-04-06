<script setup>
import IntroScreen from "./views/IntroScreen.vue";
import PokedexView from "./views/PokedexView.vue";
import { ref } from "vue";

const showPokedex = ref(false);
const audioRef = ref(null);

const startAudio = () => {
  if (audioRef.value) {
    audioRef.value.volume = 0.2;
    audioRef.value.play();
  }
};

const toggleAudio = (isMuted) => {
  if (audioRef.value) {
    audioRef.value.muted = isMuted;
  }
};

const showPokedexView = () => {
  showPokedex.value = true;
};
</script>

<template>
  <IntroScreen
    v-if="!showPokedex"
    :PokedexShow="showPokedexView"
    :onStartAudio="startAudio"
  />

  <div v-else>
    <PokedexView @toggle-audio="toggleAudio" />
  </div>

  <audio ref="audioRef" loop>
    <source src="/src/assets/audios/theme.MP3" type="audio/mp3" />
  </audio>
</template>
