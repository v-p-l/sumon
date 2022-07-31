<template>
  <v-chip :color="isGuessFound ? 'grey lighten-3' : 'grey'" small class="px-2">
    <span class="black--text">
      {{ isGuessFound ? $t('game.properties.generation') + ' ' + guessGen : $t('game.properties.generation') }}
    </span>
  </v-chip>
</template>

<script>
export default {
  props: {
		guessGen: String,
		answersGen: Array
  },
  computed: {
    isGuessFound() {
      return this.answersGen.includes(this.guessGen)
    }
  }
};
</script>