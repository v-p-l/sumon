<template>
  <v-chip :color="isGuessFound ? 'grey lighten-3' : 'grey'" small class="px-2">
    <span class="black--text">
      {{ isGuessFound ? translatedIsLegOrMyth : $t('game.properties.is_leg_or_myth.title') }}
    </span>
  </v-chip>
</template>

<script>
export default {
  props: {
		guessIsLegOrMyth: Boolean,
		answersIsLegOrMyth: Array
  },
  computed: {
    isGuessFound() {
      return this.answersIsLegOrMyth.includes(this.guessIsLegOrMyth)
    },
    translatedIsLegOrMyth() {
      return this.$t('game.properties.is_leg_or_myth.' + this.guessIsLegOrMyth);
    }
  }
};
</script>