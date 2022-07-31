<template>
  <v-chip :color="isGuessFound ? 'green' : 'grey'" small class="px-2">
    <span :class="isGuessFound ? 'white--text' : 'black--text'" class="text-capitalize">
      {{ translatedAnswerColor }}
    </span>
  </v-chip>
</template>

<script>
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
      return this.$t('game.properties.color.' + this.answerColor);
    }
  }
};
</script>