<template>
  <v-chip :color="isValid ? 'green' : 'grey'" small>
    <span>{{ translateType(pokemonType) }}</span>
  </v-chip>
</template>

<script>
import PokemonTypes from "@/traductions/types.json";
export default {
  props: {
    isValid: Boolean,
    pokemonType: String,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    translateType(pokemonType) {
      const type = PokemonTypes.find((x) => x.en === pokemonType);
      if (type) {
        return type.fr;
      } else {
        throw "Ce type n'existe pas.";
      }
    },
	},
};
</script>