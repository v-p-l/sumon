<template>
  <v-chip color="grey" small class="px-2">
    <span>{{ answersColor.includes(guessColor) ? guessColor : '?' }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
		guessColor: String,
		answersColor: Array
  },
};
</script>