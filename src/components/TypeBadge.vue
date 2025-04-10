<template>
  <span class="type-badge" :class="typeClass">
    {{ type }}
  </span>
</template>

<script>
export default {
  name: "TypeBadge",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    typeClass() {
      return `type-${this.type.toLowerCase()}`;
    },
  },
};
</script>

<style scoped>
.type-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  color: white;
}

.type-normal {
  background-color: #a8a878;
}
.type-fire {
  background-color: #f08030;
}
.type-water {
  background-color: #6890f0;
}
.type-grass {
  background-color: #78c850;
}
.type-electric {
  background-color: #f8d030;
}
.type-ice {
  background-color: #98d8d8;
}
.type-fighting {
  background-color: #c03028;
}
.type-poison {
  background-color: #a040a0;
}
.type-ground {
  background-color: #e0c068;
}
.type-flying {
  background-color: #a890f0;
}
.type-psychic {
  background-color: #f85888;
}
.type-bug {
  background-color: #a8b820;
}
.type-rock {
  background-color: #b8a038;
}
.type-ghost {
  background-color: #705898;
}
.type-dragon {
  background-color: #7038f8;
}
.type-dark {
  background-color: #705848;
}
.type-steel {
  background-color: #b8b8d0;
}
.type-fairy {
  background-color: #ee99ac;
}
</style>
