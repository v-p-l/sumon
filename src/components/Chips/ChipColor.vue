<template>
  <v-chip :color="isValid ? 'green' : 'grey'" small>
    <span>{{ translateColor(pokemonColor) }}</span>
  </v-chip>
</template>

<script>
import PokemonColors from "@/traductions/colors.json";
export default {
  props: {
    isValid: Boolean,
    pokemonColor: String,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    translateColor(color) {
      const pokemonColor = PokemonColors.find((x) => x.en === color);
      if (pokemonColor) {
        return pokemonColor.fr;
      } else {
        throw "Cette couleur n'existe pas.";
      }
    },
	},
};
</script>