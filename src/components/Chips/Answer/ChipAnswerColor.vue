<template>
  <v-chip :color="guessColor === answerColor ? 'green' : 'grey'" small class="px-2">
    <span>{{ answerColor }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
		guessColor: String,
		answerColor: String
  },
};
</script>