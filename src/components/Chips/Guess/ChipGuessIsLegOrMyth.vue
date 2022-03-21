<template>
  <v-chip color="grey" small class="px-2">
    <span>{{ answersIsLegOrMyth.includes(guessIsLegOrMyth) ? (guessIsLegOrMyth === true ? 'leg ou myth.' : 'ni lég ni myth.') : '?' }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
		guessIsLegOrMyth: Boolean,
		answersIsLegOrMyth: Array
  },
};
</script>