<template>
  <v-chip :color="guessGen === answerGen ? 'green' : 'grey'" small class="px-2">
    <span>{{ answerGen }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
    guessGen: String,
    answerGen: String,
  },
};
</script>