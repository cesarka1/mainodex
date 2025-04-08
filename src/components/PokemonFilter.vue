<template>
  <div class="filter-wrapper">
    <div class="filter-header">
      <div class="pokeball-decoration"></div>
    </div>
    <div class="filter-container">
      <div class="search-container">
        <input
          v-model="searchQuery"
          placeholder="Filtrar por nome, ID ou espécie"
          class="search-input"
          @input="applyFilters"
        />
      </div>
      <div class="select-container">
        <select
          v-model="selectedType"
          @change="applyFilters"
          class="type-select"
        >
          <option value="">Todos os elementos</option>
          <option v-for="type in pokemonTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
        <div class="select-arrow"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainodexFilter",
  data() {
    return {
      searchQuery: "",
      selectedType: "",
      pokemonTypes: [
        "fire",
        "water",
        "grass",
        "poison",
        "flying",
        "bug",
        "normal",
        "electric",
        "ground",
        "fairy",
        "fighting",
        "psychic",
        "rock",
        "steel",
        "ice",
        "ghost",
        "dragon",
        "dark",
      ],
    };
  },
  methods: {
    applyFilters() {
      this.$emit("filter-changed", {
        query: this.searchQuery.trim().toLowerCase(),
        type: this.selectedType,
      });
    },
    resetFilters() {
      this.searchQuery = "";
      this.selectedType = "";
      this.applyFilters();
    },
  },
};
</script>

<style scoped>
.filter-wrapper {
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  padding-top: 4rem;
  font-family: "Roboto", Arial, sans-serif;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
  border-radius: 8px;
  overflow: hidden;
  /* background-color: #fff; */
}

.filter-header {
  background: linear-gradient(to right, #ff1a1a, #cc0000);
  height: 12px;
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.pokeball-decoration {
  position: absolute;
  top: -14px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: white;
  border: 4px solid #333;
  border-radius: 50%;
  z-index: 2;
}

.pokeball-decoration::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #333;
  transform: translateY(-50%);
}

.pokeball-decoration::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  background-color: white;
  border: 3px solid #333;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.filter-container {
  display: flex;
  width: 100%;
  background-color: #f5f5f5;
  border-bottom: 2px solid #e0e0e0;
}

.search-container {
  flex: 3;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 14px 15px;
  background-color: #f5f5f5;
  border: none;
  color: #333;
  font-size: 14px;
  box-sizing: border-box;
  height: 50px;
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
}

.search-input:focus {
  outline: none;
  border-bottom: 2px solid #3498db;
  background-color: #fff;
}

.search-input::placeholder {
  color: #888;
  font-style: italic;
}

.select-container {
  flex: 1;
  position: relative;
  border-left: 1px solid #ddd;
  background-color: #f5f5f5;
}

.type-select {
  width: 100%;
  height: 50px;
  padding: 14px 15px;
  padding-right: 30px;
  background-color: transparent;
  color: #333;
  border: none;
  font-size: 14px;
  appearance: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
}

.type-select:focus {
  outline: none;
  border-bottom: 2px solid #3498db;
  background-color: #fff;
}

.select-arrow {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #cc0000;
  pointer-events: none;
}

/* Type badges styling - add Pokémon type colors */
.type-select option {
  padding: 10px;
  background-color: #fff;
}

/* Add a subtle transition animation */
.search-input,
.type-select {
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
}

.search-input:hover,
.type-select:hover {
  box-shadow: inset 0 0 0 1px rgba(52, 152, 219, 0.3);
}

@media (max-width: 768px) {
  .filter-wrapper {
    max-width: 95%;
    margin-top: 1rem;
  }

  .filter-container {
    flex-direction: column;
  }

  .select-container {
    border-left: none;
    border-top: 1px solid #ddd;
  }

  .pokeball-decoration {
    top: -10px;
    width: 30px;
    height: 30px;
  }

  .pokeball-decoration::after {
    width: 8px;
    height: 8px;
  }
}
</style>
