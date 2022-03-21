<template>
  <v-chip :color="guessIsLegOrMyth === answerIsLegOrMyth ? 'green' : 'grey'" small class="px-2">
    <span>{{ answerIsLegOrMyth ? "oui" : "non" }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
    guessIsLegOrMyth: Boolean,
    answerIsLegOrMyth: Boolean,
  },
};
</script>