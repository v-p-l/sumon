<template>
  <v-chip :color="isGuessFound ? 'green' : 'grey'" small class="px-2">
    <span :class="isGuessFound ? 'white--text' : 'black--text'" class="text-capitalize">{{ answerGen }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
    guessGen: String,
    answerGen: String,
  },
  computed: {
    isGuessFound() {
      return this.guessGen === this.answerGen;
    },
  }
};
</script>