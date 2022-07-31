<template>
  <v-chip :color="guessIsEvo === answerIsEvo ? 'green' : 'grey'" small class="px-2">
		<span :class="isGuessFound ? 'white--text' : 'black--text'">
      {{ translatedAnswerIsEvo }}
    </span>
  </v-chip>
</template>

<script>
export default {
  props: {
		guessIsEvo: Boolean,
		answerIsEvo: Boolean
  },
  computed: {
    isGuessFound() {
      return this.guessIsEvo === this.answerIsEvo;
    },
    translatedAnswerIsEvo() {
      return this.$t('game.properties.is_evolution.' + this.answerIsEvo);
    }
  }
};
</script>