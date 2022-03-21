<template>
  <v-chip color="grey" small class="px-2">
    <span>Gen {{ answersGen.includes(guessGen) ? guessGen : '?' }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
		guessGen: String,
		answersGen: Array
  },
};
</script>