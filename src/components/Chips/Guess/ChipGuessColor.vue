<template>
  <v-chip :color="isGuessFound ? (guessColor === 'white' ? 'grey lighten-3' : guessColor) : 'grey'" small class="px-2">
    <span :class="isGuessFound ? (guessColor === 'white' ? 'black--text text-capitalize' : 'white--text text-capitalize') : 'black--text'">
      {{ isGuessFound ? translatedGuessColor : $t('game.properties.color.title') }}
    </span>
  </v-chip>
</template>

<script>
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
      return this.$t('game.properties.color.' + this.guessColor);
    }
  }
};
</script>