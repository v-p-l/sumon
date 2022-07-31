<template>
  <v-dialog v-model="dialog" width="400">
    <v-card class="py-5">
      <v-row no-gutters class="justify-center">
        <v-col cols="12">
          <v-card-title class="justify-center pa-0 mb-4">{{
            isPokemonGuessed ? $t('game.dialogStats.titleWin') : $t('game.dialogStats.titleLose')
          }}</v-card-title>
          <v-card-text class="d-flex flex-row justify-center pb-0"
            >{{ $t('game.dialogStats.guessReveal') }}
            {{ pokemonName }}.</v-card-text
          >
          <v-img
            max-height="100"
            max-width="100"
            class="mx-auto"
            :src="pokemonToGuess.sprite"
          ></v-img>
          <v-row no-gutters class="justify-center px-4 mb-2" style="gap: 8px">
            <div v-for="(type, i) in pokemonToGuess.types" :key="i">
              <ChipGuessType
                :guessType="type"
                :answersTypes="pokemonToGuess.types"
                :number="i + 1"
              />
            </div>
            <div>
              <ChipGuessColor
                :guessColor="pokemonToGuess.color"
                :answersColor="[pokemonToGuess.color]"
              />
            </div>
            <!-- <div>
              <ChipGuessGen
                :guessGen="pokemonToGuess.generation"
                :answersGen="[pokemonToGuess.generation]"
              />
            </div> -->
            <div>
              <ChipGuessIsEvo
                :guessIsEvo="pokemonToGuess.is_evolution"
                :answersIsEvo="[pokemonToGuess.is_evolution]"
              />
            </div>
            <div>
              <ChipGuessIsLegOrMyth
                :guessIsLegOrMyth="pokemonToGuess.is_leg_or_myth"
                :answersIsLegOrMyth="[pokemonToGuess.is_leg_or_myth]"
              />
            </div>
          </v-row>
          <v-divider class="mb-4"></v-divider>
          <v-row
            no-gutters
            class="justify-space-between align-center px-4 mb-2"
          >
            <div class="text-center">
              {{
                "Sumon #" +
                challengeOfTheDayID +
                " (" +
                answers.length +
                "/" +
                limitTry +
                ")"
              }}
            </div>
            <v-btn small depressed color="primary" @click="copyStats()">
              <v-icon small class="mr-1">mdi-content-copy</v-icon>
              <span>{{ $t('game.dialogStats.buttonCopyLabel') }}</span>
            </v-btn>
          </v-row>
          <div v-for="(rowStats, i) in globalStats" :key="i" class="px-4">
            {{ rowStats }}
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import ChipGuessType from "@/components/Chips/Guess/ChipGuessType.vue";
import ChipGuessColor from "@/components/Chips/Guess/ChipGuessColor.vue";
// import ChipGuessGen from "@/components/Chips/Guess/ChipGuessGen.vue";
import ChipGuessIsEvo from "@/components/Chips/Guess/ChipGuessIsEvo.vue";
import ChipGuessIsLegOrMyth from "@/components/Chips/Guess/ChipGuessIsLegOrMyth.vue";
import PokeAPI from "@/services/PokeAPI";

export default {
  components: {
    ChipGuessType,
    ChipGuessColor,
    // ChipGuessGen,
    ChipGuessIsEvo,
    ChipGuessIsLegOrMyth,
  },
  props: {
    value: Boolean,
    pokemonToGuess: Object,
    answers: Array,
    isPokemonGuessed: Boolean,
    isGameEnded: Boolean,
    limitTry: Number
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  computed: {
    ...mapGetters("game", [
      "challengeOfTheDayID"
    ]),
    ...mapGetters("utilities", [
      "lang"
    ]),
    dialog: {
      get () {
        return this.value;
      },
      set (value) {
				this.$emit('input', value);
      },
    },
    globalStats() {
      return this.generateStats(this.pokemonToGuess, this.answers);
    },
    pokemonName() {
      return PokeAPI.pokemonIDToName(this.pokemonToGuess.id, this.lang);
    }
  },
  methods: {
    generateStats(pokemonToGuess, answers) {
      const globalStats = []

      for (let i = 0; i < answers.length; i++) {
        let rowStats = "";
        for (let property in answers[i]) {
          if (property === "sprite") {
            continue;
          } else {
            if (
              JSON.stringify(answers[i][property]) ===
              JSON.stringify(pokemonToGuess[property])
            ) {
              rowStats = rowStats + "🟩";
            } else {
              rowStats = rowStats + "⬜";
            }
          }
        }
        globalStats.push(rowStats);
      }

      return globalStats;
    },
    copyStats() {
      const container = document.querySelector(".v-dialog");

      let text =
        "SUMON #" +
        this.challengeOfTheDayID +
        " (" +
        this.answers.length +
        "/" +
        this.limitTry +
        ")" +
        "\n\n";
      for (let i = 0; i < this.globalStats.length; i++) {
        text = text + this.globalStats[i] + "\n";
      }
      text = text + "\n https://sumon.vercel.app/";

      this.$copyText(text, container)
        .then(() => {
        })
        .catch((err) => {
          console.log(err)
        });
    },
  },
};
</script>