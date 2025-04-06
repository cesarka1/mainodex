<script setup>
import { ref } from "vue";

const audioRef = ref(null);
const isPlaying = ref(false);
const props = defineProps({
  PokedexShow: Function,
});

const startApp = () => {
  if (audioRef.value) {
    audioRef.value.play();
    isPlaying.value = true;
    audioRef.value.volume = 0.2;
    setTimeout(() => {
      props.PokedexShow();
    }, 1500);
  }
};
</script>

<template>
  <div class="intro-screen">
    <div class="content-container">
      <h1 class="title">Mainôdex</h1>

      <div class="pokedex-container">
        <img
          src="/src/assets/imgs/mainodex.png"
          alt="maino-pokedex"
          class="logo"
          :class="{ pulse: !isPlaying }"
        />
      </div>

      <button @click="startApp" class="start-button" :disabled="isPlaying">
        {{ isPlaying ? "Carregando..." : "Iniciar Mainôdex" }}
      </button>

      <p class="instructions">Clique para entrar na sua Mainôdex</p>
    </div>

    <audio ref="audioRef" loop>
      <source src="/src/assets/audios/theme.MP3" type="audio/mp3" />
      Seu navegador não suporta áudio HTML5.
    </audio>
  </div>
</template>

<style scoped>
.intro-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Arial", sans-serif;
}

.content-container {
  max-width: 500px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 4rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #e83e35;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.pokedex-container {
  margin: 2rem 0;
}

.logo {
  height: 12em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms, transform 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
  transform: scale(1.05);
}

.pulse {
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.start-button {
  background-color: #3d7dca;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin: 1rem 0;
  min-width: 200px;
}

.start-button:hover:not(:disabled) {
  background-color: #2a5a9c;
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.start-button:disabled {
  background-color: #95aacf;
  cursor: not-allowed;
}

.instructions {
  color: #666;
  font-size: 0.9rem;
  margin-top: 1rem;
}
</style>
