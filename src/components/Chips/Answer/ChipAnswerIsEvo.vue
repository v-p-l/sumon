<template>
  <v-chip :color="guessIsEvo === answerIsEvo ? 'green' : 'grey'" small class="px-2">
		<span>{{ answerIsEvo ? "oui" : "non" }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
		guessIsEvo: Boolean,
		answerIsEvo: Boolean
  },
};
</script>