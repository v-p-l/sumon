<template>
  <v-chip :color="isGuessFound ? guessTypeToColor : 'grey'" small class="px-2">
    <span :class="isGuessFound ? 'white--text text-capitalize' : 'black--text'">
      {{ isGuessFound ? translatedGuessType : 'Type ' + number }}
    </span>
  </v-chip>
</template>

<script>
import PokeAPI from "@/services/PokeAPI";
export default {
  props: {
		guessType: String,
    answersTypes: Array,
		number: Number
  },
  computed: {
    isGuessFound() {
      return this.answersTypes.includes(this.guessType)
    },
    translatedGuessType() {
      return PokeAPI.translateType(this.guessType);
    },
    guessTypeToColor() {
      return PokeAPI.typeToColor(this.guessType);
    }
  }
};
</script>