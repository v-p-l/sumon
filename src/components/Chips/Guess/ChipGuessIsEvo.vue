<template>
  <v-chip color="grey" small class="px-2">
    <span>{{ answersIsEvo.includes(guessIsEvo) ? (guessIsEvo === true ? 'évolution' : 'pas une évolution') : '?' }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
		guessIsEvo: Boolean,
		answersIsEvo: Array
  },
};
</script>