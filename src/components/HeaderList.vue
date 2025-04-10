<template>
  <header class="header">
    <div class="header-logo">
      <img src="/public/icon.png" alt="Logo Mainodex" />
      <h1 class="header-title">Mainôdex</h1>
    </div>

    <nav class="header-nav">
      <ul>
        <li>
          <button @click="toggleMute" class="audio-btn">
            <i class="bi" :class="isMuted ? 'bi-volume-mute-fill' : 'bi-volume-up-fill'"></i>
            <span class="audio-text">{{ isMuted ? "Unmute" : "Mute" }}</span>
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderList",
  data() {
    return {
      isMuted: false,
    };
  },
  methods: {
    toggleMute() {
      this.isMuted = !this.isMuted;
      this.$emit("toggle-audio", this.isMuted); // envia para o componente pai
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fc504c;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: #fff;
  max-width: 100%;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-logo img {
  height: 50px;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.header-logo img:hover {
  transform: scale(1.05);
}

.header-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.header-nav ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.audio-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  color: #fc504c;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.audio-btn:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.audio-btn i {
  font-size: 1.2rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }

  .header-logo img {
    height: 40px;
  }

  .header-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .audio-text {
    display: none;
  }

  .audio-btn {
    padding: 0.5rem;
  }

  .header-logo img {
    height: 35px;
  }

  .header-title {
    font-size: 1.3rem;
  }
}
</style>