<template>
  <v-chip :color="isGuessFound ? 'grey lighten-3' : 'grey'" small class="px-2">
    <span class="black--text">
      {{ isGuessFound ? (guessIsLegOrMyth === true ? 'Légendaire ou mythique' : 'Ni légendaire ni mythique') : 'Légendaire ou mythique' }}
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
    }
  }
};
</script>