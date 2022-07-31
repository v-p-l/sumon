<template>
  <v-chip :color="isGuessFound ? 'green' : 'grey'" small class="px-2">
    <span :class="isGuessFound ? 'white--text' : 'black--text'" class="text-capitalize">
      {{ translatedAnswerType }}
    </span>
  </v-chip>
</template>

<script>
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
      return this.$t('game.properties.type.' + this.answerType);
    }
  }
};
</script>