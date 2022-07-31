<template>
  <v-chip :color="isGuessFound ? 'green' : 'grey'" small class="px-2">
    <span :class="isGuessFound ? 'white--text' : 'black--text'">
      {{ translatedIsLegOrMyth }}
    </span>
  </v-chip>
</template>

<script>
export default {
  props: {
    guessIsLegOrMyth: Boolean,
    answerIsLegOrMyth: Boolean,
  },
  computed: {
    isGuessFound() {
      return this.guessIsLegOrMyth === this.answerIsLegOrMyth;
    },
    translatedIsLegOrMyth() {
      return this.$t('game.properties.is_leg_or_myth.' + this.answerIsLegOrMyth);
    }
  }
};
</script>