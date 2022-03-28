<template>
  <v-chip :color="guessIsEvo === answerIsEvo ? 'green' : 'grey'" small class="px-2">
		<span :class="isGuessFound ? 'white--text' : 'black--text'">
      {{ answerIsEvo ? "Oui" : "Non" }}
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
  }
};
</script>