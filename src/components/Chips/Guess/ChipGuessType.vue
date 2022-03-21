<template>
  <v-chip color="grey" small class="px-2">
    <span>{{ answersTypes.includes(guessType) ? 'Type ' + number + ' : ' + guessType : 'Type ' + number + ' ?' }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
		guessType: String,
    answersTypes: Array,
		number: Number
  },
};
</script>