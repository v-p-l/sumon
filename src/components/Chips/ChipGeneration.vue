<template>
  <v-chip :color="isValid ? 'green' : 'grey'" small>
    <span>{{ transformGen(pokemonGen) }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
    isValid: Boolean,
    pokemonGen: String,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    transformGen(pokemonGen) {
      switch (pokemonGen) {
        case "generation-i":
          return "1";
        case "generation-ii":
          return "2";
        case "generation-iii":
          return "3";
        case "generation-iv":
          return "4";
        case "generation-v":
          return "5";
        case "generation-vi":
          return "6";
        case "generation-vii":
          return "7";
        case "generation-viii":
          return "8";
      }
    },
  },
};
</script>