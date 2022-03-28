<template>
  <v-chip :color="isGuessFound ? 'green' : 'grey'" small class="px-2">
    <span :class="isGuessFound ? 'white--text' : 'black--text'" class="text-capitalize">
      {{ translatedAnswerColor }}
    </span>
  </v-chip>
</template>

<script>
import PokeAPI from "@/services/PokeAPI";
export default {
  props: {
		guessColor: String,
		answerColor: String
  },
  computed: {
    isGuessFound() {
      return this.guessColor === this.answerColor;
    },
    translatedAnswerColor() {
      return PokeAPI.translateColor(this.answerColor);
    }
  }
};
</script>