<template>
  <v-chip :color="guessID === answerID ? 'green' : 'grey'" small class="px-2">
		<span :class="isGuessFound ? 'white--text' : 'black--text'">
      {{ answerID }}
    </span>
		<v-icon v-if="!isGuessFound" small color="black">mdi-{{ guessID > answerID ? 'arrow-up' : 'arrow-down' }}</v-icon>
  </v-chip>
</template>

<script>
export default {
  props: {
		guessID: Number,
		answerID: Number
  },
  computed: {
    isGuessFound() {
      return this.guessID === this.answerID;
    },
  }
};
</script>