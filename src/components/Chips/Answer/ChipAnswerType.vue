<template>
  <v-chip :color="guessTypes.includes(answerType) ? 'green' : 'grey'" small class="px-2">
    <span>{{ answerType }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
		guessTypes: Array,
    answerType: String,
  },
};
</script>