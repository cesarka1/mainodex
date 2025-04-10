<script setup>
import { ref } from "vue";

const isPlaying = ref(false);

const props = defineProps({
  PokedexShow: Function,
  onStartAudio: Function,
});

const startApp = () => {
  isPlaying.value = true;
  props.onStartAudio?.();

  setTimeout(() => {
    props.PokedexShow();
  }, 1500);
};
</script>

<template>
  <div class="intro-screen">
    <div class="content-container">
      <h1 class="title">Mainôdex</h1>

      <div class="pokedex-container">
        <img
          src="/public/icon.png"
          alt="maino-pokedex"
          class="logo"
          :class="{ pulse: !isPlaying }"
        />
      </div>

      <button @click="startApp" class="start-button" :disabled="isPlaying">
        <span class="button-text">{{ isPlaying ? "Carregando..." : "Iniciar Mainôdex" }}</span>
      </button>

      <p class="instructions">Clique para entrar na sua Mainôdex</p>
    </div>
  </div>
</template>

<style scoped>
.intro-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Arial", sans-serif;
  min-height: 100vh;
}

.content-container {
  max-width: 500px;
  width: 90%;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #e83e35;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.5px;
}

.pokedex-container {
  margin: 2.5rem 0;
}

.logo {
  height: 12em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms, transform 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
  transform: scale(1.07);
}

.pulse {
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    filter: drop-shadow(0 0 0.5em rgba(232, 62, 53, 0.2));
  }
  50% {
    transform: scale(1.07);
    filter: drop-shadow(0 0 1em rgba(232, 62, 53, 0.4));
  }
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 0.5em rgba(232, 62, 53, 0.2));
  }
}

.start-button {
  background-color: #3d7dca;
  color: white;
  border: none;
  padding: 1rem 2.2rem;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 1.5rem 0;
  min-width: 220px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
}

.start-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.start-button:hover:not(:disabled) {
  background-color: #2a5a9c;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(42, 90, 156, 0.3);
}

.start-button:hover:not(:disabled):before {
  opacity: 1;
}

.start-button:active:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(42, 90, 156, 0.3);
}

.start-button:disabled {
  background-color: #95aacf;
  cursor: not-allowed;
}

.button-icon {
  transition: transform 0.2s ease;
}

.start-button:hover:not(:disabled) .button-icon {
  transform: translateX(4px);
}

.instructions {
  color: #666;
  font-size: 1rem;
  margin-top: 1.2rem;
  font-weight: 500;
}
</style>