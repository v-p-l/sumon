<template>
  <v-chip :color="isGuessFound ? guessColor : 'grey'" small class="px-2">
    <span :class="isGuessFound ? 'white--text text-capitalize' : 'black--text'">
      {{ isGuessFound ? translatedGuessColor : 'Couleur' }}
    </span>
  </v-chip>
</template>

<script>
import PokeAPI from "@/services/PokeAPI";
export default {
  props: {
		guessColor: String,
		answersColor: Array,
  },
  computed: {
    isGuessFound() {
      return this.answersColor.includes(this.guessColor)
    },
    translatedGuessColor() {
      return PokeAPI.translateColor(this.guessColor);
    }
  }
};
</script>