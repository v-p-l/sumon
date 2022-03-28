<template>
  <v-chip :color="isGuessFound ? 'grey lighten-3' : 'grey'" small class="px-2">
    <span class="black--text">
      {{ isGuessFound ? 'Génération ' + guessGen : 'Génération' }}
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