<template>
  <v-chip :color="guessID === answerID ? 'green' : 'grey'" small class="px-2">
		<span>{{ answerID }}</span>
		<v-icon v-if="guessID !== answerID" small>mdi-{{ guessID > answerID ? 'arrow-up' : 'arrow-down' }}</v-icon>
  </v-chip>
</template>

<script>
export default {
  props: {
		guessID: Number,
		answerID: Number
  },
};
</script>