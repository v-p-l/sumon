<template>
  <v-chip color="grey" small class="px-2">
    <span>{{ answersIsLegOrMyth.includes(guessIsLegOrMyth) ? (guessIsLegOrMyth === true ? 'Légendaire ou mythique' : 'Ni légendaire ni mythique') : 'Légendaire ou mythique ?' }}</span>
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