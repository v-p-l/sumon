<template>
  <v-chip :color="isGuessFound ? 'grey lighten-3' : 'grey'" small class="px-2">
    <span class="black--text">
      {{ isGuessFound ? translatedGuessIsEvo : $t('game.properties.is_evolution.title') }}
    </span>
  </v-chip>
</template>

<script>
export default {
  props: {
		guessIsEvo: Boolean,
		answersIsEvo: Array
  },
  computed: {
    isGuessFound() {
      return this.answersIsEvo.includes(this.guessIsEvo)
    },
    translatedGuessIsEvo() {
      return this.$t('game.properties.is_evolution.' + this.guessIsEvo);
    }
  }
};
</script>