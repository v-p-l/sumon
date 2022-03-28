<template>
  <v-chip :color="isGuessFound ? 'green' : 'grey'" small class="px-2">
    <span :class="isGuessFound ? 'white--text' : 'black--text'" class="text-capitalize">
      {{ translatedAnswerType }}
    </span>
  </v-chip>
</template>

<script>
import PokeAPI from "@/services/PokeAPI";
export default {
  props: {
		guessTypes: Array,
    answerType: String,
  },
  computed: {
    isGuessFound() {
      return this.guessTypes.includes(this.answerType);
    },
    translatedAnswerType() {
      return PokeAPI.translateType(this.answerType);
    }
  }
};
</script>