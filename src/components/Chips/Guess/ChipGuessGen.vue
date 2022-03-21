<template>
  <v-chip color="grey" small class="px-2">
    <span>{{ answersGen.includes(guessGen) ? 'Génération ' + guessGen : 'Génération ?' }}</span>
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