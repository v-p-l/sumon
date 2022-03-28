<template>
  <v-container style="max-width: 400px" class="pa-0">
    <v-card v-if="pokemonToGuess" class="mb-4">
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
          v-if="gameEnd"
          absolute
          :color="isPokemonGuessed ? 'green' : 'red'"
        >
          <v-row no-gutters class="justify-end pa-2">
            <v-btn color="white" small class="mr-2" @click="playAgain()">
              <span class="black--text">Nouvelle partie</span>
            </v-btn>
            <v-btn color="white" small @click="dialogEndGame = true">
              <span class="black--text">Statistiques</span>
            </v-btn>
          </v-row>
        </v-overlay>
      </v-fade-transition>
    </v-card>
    <v-autocomplete
      v-if="!gameEnd"
      v-model="pokemonNameToVerify"
      :items="pokemonNamesFR"
      hide-details
      flat
      hide-no-data
      filled
      dense
      :menu-props="{ closeOnContentClick: true, maxHeight: 96 }"
      :label="'Nom du pokémon (' + answers.length + '/' + limitTry + ')'"
      color="dark"
    >
      <template #item="{ item }">
        <v-list-item
          dense
          class="d-flex"
          @click="verifyPokemon(item)"
          @keyup.enter="verifyPokemon(pokemonNameToVerify)"
        >
          <div class="ml-2">{{ item }}</div>
        </v-list-item>
      </template>
    </v-autocomplete>
    <small class="red--text">{{ verifyError }}</small>
    <TableAnswers :answers="answers" :pokemonToGuess="pokemonToGuess" />
    <v-dialog v-if="pokemonToGuess" v-model="dialogEndGame" width="450">
      <v-card class="pa-5">
        <v-row no-gutters class="justify-center">
          <v-col cols="12">
            <v-card-title class="justify-center pa-0 mb-4">{{
              isPokemonGuessed ? "GG ! 😄" : `Dommage... 😞`
            }}</v-card-title>
            <v-card-text class="d-flex flex-row justify-center pb-0"
              >Le pokémon à deviner était
              {{ pokemonToGuess.french_name }}</v-card-text
            >
            <v-img
              max-height="100"
              max-width="100"
              class="mx-auto"
              :src="pokemonToGuess.sprite"
            ></v-img>
            <v-divider class="mb-4"></v-divider>
            <v-row no-gutters class="justify-space-between align-center">
              <div class="text-center">
                {{
                  "Sumon #" +
                  pokemonToGuess.id +
                  " (" +
                  answers.length +
                  "/" +
                  limitTry +
                  ")"
                }}
              </div>
              <v-btn small depressed color="primary" @click="copyStats()">
                <v-icon small class="mr-1">mdi-content-copy</v-icon>
                <span>Copier</span>
              </v-btn>
            </v-row>
            <div v-for="(rowStats, i) in globalStats" :key="i">
              {{ rowStats }}
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import PokeAPI from "@/services/PokeAPI";
import PokemonNames from "@/traductions/pokemons.json";
import TableAnswers from "@/views/Home/components/TableAnswers.vue";
import ChipGuessType from "@/components/Chips/Guess/ChipGuessType.vue";
import ChipGuessColor from "@/components/Chips/Guess/ChipGuessColor.vue";
import ChipGuessGen from "@/components/Chips/Guess/ChipGuessGen.vue";
import ChipGuessIsEvo from "@/components/Chips/Guess/ChipGuessIsEvo.vue";
import ChipGuessIsLegOrMyth from "@/components/Chips/Guess/ChipGuessIsLegOrMyth.vue";

export default {
  name: "Sumon",
  components: {
    TableAnswers,
    ChipGuessType,
    ChipGuessColor,
    ChipGuessGen,
    ChipGuessIsEvo,
    ChipGuessIsLegOrMyth,
  },
  mixins: [],
  data() {
    return {
      pokemonToGuess: null,
      answers: [],
      pokemonNameToVerify: "",
      verifyError: "",
      loading: false,
      particlesStyle: {
        particles: [
          {
            type: "rect",
          },
        ],
        defaultColors: ["red", "blue", "yellow"],
        defaultSize: 6,
      },
      dialogEndGame: false,
      pokemonNamesFR: [],
      globalStats: [],
      limitTry: 6,
    };
  },
  mounted() {
    this.generatePokemon();
    this.loadPokemonNamesFR();
  },
  computed: {
    isPokemonGuessed() {
      return this.answers.some((x) => x.id === this.pokemonToGuess.id);
    },
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
    gameEnd() {
      if (this.isPokemonGuessed || this.answersLength === 6) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async test() {
      try {
        this.pokemonToGuess = await PokeAPI.getPokemonByID(149);
      } catch (err) {
        this.error = err;
      }
    },
    async generatePokemon() {
      this.loading = true;
      try {
        this.pokemonToGuess = await PokeAPI.generateRandomPokemon();
        this.loading = false;
      } catch (err) {
        this.error = err;
        console.log(err);
      }
    },
    async verifyPokemon(name) {
      this.loading = true;

      const alreadyVerified = this.answers.find((x) => x.french_name === name);
      if (alreadyVerified) {
        this.verifyError = "Pokémon déjà vérifié.";
        this.loading = false;
        return;
      }

      try {
        const id = await PokeAPI.pokemonFrenchNameToID(name);
        const answer = await PokeAPI.getPokemonByID(id);
        this.answers.push(answer);
        this.loading = false;
        this.pokemonNameToVerify = "";
        this.verifyError = "";
      } catch (err) {
        this.loading = false;
        this.verifyError = err;
      }
    },
    loadPokemonNamesFR() {
      for (let i = 0; i < PokemonNames.length; i++) {
        this.pokemonNamesFR.push(PokemonNames[i].fr);
      }
    },
    generateStats() {
      let globalStats = [];
      for (let i = 0; i < this.answers.length; i++) {
        let rowStats = "";
        for (let property in this.answers[i]) {
          if (property === "sprite" || property === "french_name") {
            continue;
          } else {
            if (
              JSON.stringify(this.answers[i][property]) ===
              JSON.stringify(this.pokemonToGuess[property])
            ) {
              rowStats = rowStats + "🟩";
            } else {
              rowStats = rowStats + "⬜";
            }
          }
        }
        globalStats.push(rowStats);
      }
      this.globalStats = globalStats;
    },
    copyStats() {
      const container = document.querySelector(".v-dialog");

      let text =
        "SUMON #" +
        this.pokemonToGuess.id +
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

      this.$copyText(text, container).then(() => {
        console.log("copied!");
      });
    },
    playAgain() {
      this.generatePokemon();
      this.answers = [];
    },
  },
  watch: {
    gameEnd(newValue) {
      if (newValue) {
        this.generateStats();
        this.dialogEndGame = true;
        if (this.isPokemonGuessed) {
          this.$confetti.start(this.particlesStyle);
          setTimeout(
            function () {
              this.$confetti.stop();
            }.bind(this),
            2500
          );
        }
      }
    },
  },
};
</script>