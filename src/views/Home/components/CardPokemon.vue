<template>
  <v-card class="mb-4">
    <v-row no-gutters class="justify-center pa-2">
      <v-img
        max-height="100"
        max-width="100"
        :src="pokemonToGuess.sprite"
        :style="isPokemonGuessed ? '' : 'filter: blur(15px);'"
      ></v-img>
    </v-row>
    <v-divider></v-divider>
    <v-col cols="12" class="pa-2">
      <v-row no-gutters class="justify-center mb-1 px-2" style="gap: 8px">
        <div v-for="(type, i) in pokemonToGuess.types" :key="i">
          <ChipGuessType
            :guessType="type"
            :answersTypes="answersTypes"
            :number="i + 1"
          />
        </div>
        <div>
          <ChipGuessColor
            :guessColor="pokemonToGuess.color"
            :answersColor="answersColor"
          />
        </div>
      </v-row>
      <v-row no-gutters class="justify-center px-2" style="gap: 8px">
        <div>
          <ChipGuessGen
            :guessGen="pokemonToGuess.generation"
            :answersGen="answersGen"
          />
        </div>
        <div>
          <ChipGuessIsEvo
            :guessIsEvo="pokemonToGuess.is_evolution"
            :answersIsEvo="answersIsEvo"
          />
        </div>
        <div>
          <ChipGuessIsLegOrMyth
            :guessIsLegOrMyth="pokemonToGuess.is_leg_or_myth"
            :answersIsLegOrMyth="answersIsLegOrMyth"
          />
        </div>
      </v-row>
    </v-col>
    <v-fade-transition>
      <v-overlay
        v-if="isGameEnded"
        absolute
        :color="isPokemonGuessed ? 'green' : 'red'"
      >
        <v-row no-gutters class="justify-end pa-2">
          <v-btn color="white" small @click="emitOpenDialog()">
            <span class="black--text">Statistiques</span>
          </v-btn>
        </v-row>
      </v-overlay>
    </v-fade-transition>
  </v-card>
</template>

<script>
import ChipGuessType from "@/components/Chips/Guess/ChipGuessType.vue";
import ChipGuessColor from "@/components/Chips/Guess/ChipGuessColor.vue";
import ChipGuessGen from "@/components/Chips/Guess/ChipGuessGen.vue";
import ChipGuessIsEvo from "@/components/Chips/Guess/ChipGuessIsEvo.vue";
import ChipGuessIsLegOrMyth from "@/components/Chips/Guess/ChipGuessIsLegOrMyth.vue";

export default {
  components: {
    ChipGuessType,
    ChipGuessColor,
    ChipGuessGen,
    ChipGuessIsEvo,
    ChipGuessIsLegOrMyth,
  },
  props: {
    pokemonToGuess: Object,
    answers: Array,
    isPokemonGuessed: Boolean,
    isGameEnded: Boolean,
  },
  data() {
    return {
    };
  },
  mounted() {},
  computed: {
    answersTypes() {
      return [...new Set(this.answers.flatMap((i) => i.types))];
    },
    answersColor() {
      return [...new Set(this.answers.map((x) => x.color))];
    },
    answersGen() {
      return [...new Set(this.answers.map((x) => x.generation))];
    },
    answersIsEvo() {
      return [...new Set(this.answers.map((x) => x.is_evolution))];
    },
    answersIsLegOrMyth() {
      return [...new Set(this.answers.map((x) => x.is_leg_or_myth))];
    },
    answersLength() {
      return this.answers.length;
    },
  },
  methods: {
    emitOpenDialog() {
      this.$emit('openStatsDialog')
    },
  },
};
</script>