<template>
  <v-container style="max-width: 400px" class="pa-0">
    <v-img
      class="mb-2"
      src="https://i0.wp.com/www.alphr.com/wp-content/uploads/2016/07/whos_that_pokemon.png?fit=1920%2C1080&ssl=1"
    >
      <v-container fill-height class="align-start pa-0">
        <v-row no-gutters class="justify-end pt-2 pr-2">
          <v-btn small @click="playAgain()">
            <span>Play again</span>
          </v-btn>
        </v-row>
        <v-row no-gutters style="height: calc(100% - 38px)">
          <v-img
            v-if="isPokemonGuessed"
            max-height="150"
            max-width="150"
            style="left: 8%"
            :src="pokemonToGuess.sprite"
          ></v-img>
        </v-row>
      </v-container>
    </v-img>
    <v-row no-gutters v-if="pokemonToGuess" class="justify-space-between mb-4">
      <div v-for="(type, i) in pokemonToGuess.types" :key="i">
        <ChipGuessType :guessType="type" :answersTypes="answersTypes" />
      </div>
      <ChipGuessColor
        :guessColor="pokemonToGuess.color"
        :answersColor="answersColor"
      />
      <ChipGuessGen
        :guessGen="pokemonToGuess.generation"
        :answersGen="answersGen"
      />
      <ChipGuessIsEvo
        :guessIsEvo="pokemonToGuess.is_evolution"
        :answersIsEvo="answersIsEvo"
      />
      <ChipGuessIsLegOrMyth
        :guessIsLegOrMyth="pokemonToGuess.is_leg_or_myth"
        :answersIsLegOrMyth="answersIsLegOrMyth"
      />
    </v-row>
    <v-row v-if="!isPokemonGuessed" no-gutters class="align-end">
      <v-autocomplete
        v-model="pokemonNameToVerify"
        :items="pokemonNamesFR"
        hide-details
        auto-select-first
        filled
        dense
        color="dark"
        ref="autocomplete"
        label="Nom du pokémon"
      >
        <template #item="{ item }">
          <v-list-item
            class="d-flex"
            @click="verifyPokemon(item)"
            @keyup.enter="verifyPokemon(pokemonNameToVerify)"
          >
            <div class="ml-2">{{ item }}</div>
          </v-list-item>
        </template>
      </v-autocomplete>
    </v-row>
    <small v-if="verifyError" class="red--text">{{ verifyError }}</small>
    <v-data-table
      :headers="headers"
      :items="answers"
      item-class="spacing"
      class="mt-2"
      hide-default-footer
      mobile-breakpoint="0"
    >
      <!-- Sprite -->
      <template v-slot:[`item.sprite`]="{ item }">
        <v-avatar>
          <v-img :src="item.sprite"></v-img>
        </v-avatar>
      </template>
      <!-- Pokedex number -->
      <template v-slot:[`item.id`]="{ item }">
        <ChipAnswerID :guessID="pokemonToGuess.id" :answerID="item.id" />
      </template>
      <!-- Types -->
      <template v-slot:[`item.types`]="{ item }">
        <div class="d-flex flex-column" style="gap: 4px">
          <div v-for="(type, i) in item.types" :key="i">
            <ChipAnswerType
              :guessTypes="pokemonToGuess.types"
              :answerType="type"
            />
          </div>
        </div>
      </template>
      <!-- Color -->
      <template v-slot:[`item.color`]="{ item }">
        <ChipAnswerColor
          :guessColor="pokemonToGuess.color"
          :answerColor="item.color"
        />
      </template>
      <!-- Generation -->
      <template v-slot:[`item.generation`]="{ item }">
        <ChipAnswerGen
          :guessGen="pokemonToGuess.generation"
          :answerGen="item.generation"
        />
      </template>
      <!-- Is evolution -->
      <template v-slot:[`item.is_evolution`]="{ item }">
        <ChipAnswerIsEvo
          :guessIsEvo="pokemonToGuess.is_evolution"
          :answerIsEvo="item.is_evolution"
        />
      </template>
      <!-- Is legendary or mythical -->
      <template v-slot:[`item.is_leg_or_myth`]="{ item }">
        <ChipAnswerIsLegOrMyth
          :guessIsLegOrMyth="pokemonToGuess.is_leg_or_myth"
          :answerIsLegOrMyth="item.is_leg_or_myth"
        />
      </template>
    </v-data-table>
    <v-dialog v-if="pokemonToGuess != null" v-model="dialogEndGame" width="450">
      <v-card class="pa-5">
        <v-row no-gutters class="justify-center">
          <v-col cols="12">
            <v-card-title class="justify-center pa-0 mb-4"
              >Tu as trouvé le pokémon !</v-card-title
            >
            <v-card-text
              class="
                d-flex
                flex-row
                justify-center
                text-capitalize
                pb-0
                mb-n5
                text-h6
              "
              >{{ pokemonToGuess.french_name }}</v-card-text
            >
            <v-img
              max-height="150"
              max-width="150"
              class="mx-auto"
              :src="pokemonToGuess.sprite"
            ></v-img>
            <v-divider class="mb-4"></v-divider>
            <v-row no-gutters class="justify-space-between align-center">
              <div class="text-center">
                Sumon #{{ pokemonToGuess.id }}, {{ answers.length }}
              </div>
              <v-btn small color="primary">
                <v-icon small class="mr-1">mdi-content-copy</v-icon>
                <span>Copier</span>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import PokeAPI from "@/services/PokeAPI";
import PokemonNames from "@/traductions/pokemons.json";
import ChipAnswerID from "@/components/Chips/Answer/ChipAnswerID.vue";
import ChipAnswerType from "@/components/Chips/Answer/ChipAnswerType.vue";
import ChipAnswerColor from "@/components/Chips/Answer/ChipAnswerColor.vue";
import ChipAnswerGen from "@/components/Chips/Answer/ChipAnswerGen.vue";
import ChipAnswerIsEvo from "@/components/Chips/Answer/ChipAnswerIsEvo.vue";
import ChipAnswerIsLegOrMyth from "@/components/Chips/Answer/ChipAnswerIsLegOrMyth.vue";
import ChipGuessType from "@/components/Chips/Guess/ChipGuessType.vue";
import ChipGuessColor from "@/components/Chips/Guess/ChipGuessColor.vue";
import ChipGuessGen from "@/components/Chips/Guess/ChipGuessGen.vue";
import ChipGuessIsEvo from "@/components/Chips/Guess/ChipGuessIsEvo.vue";
import ChipGuessIsLegOrMyth from "@/components/Chips/Guess/ChipGuessIsLegOrMyth.vue";

export default {
  name: "Sumon",
  components: {
    ChipAnswerType,
    ChipAnswerColor,
    ChipAnswerGen,
    ChipAnswerIsEvo,
    ChipAnswerIsLegOrMyth,
    ChipAnswerID,
    ChipGuessType,
    ChipGuessColor,
		ChipGuessGen,
		ChipGuessIsEvo,
		ChipGuessIsLegOrMyth
  },
  mixins: [],
  data() {
    return {
      pokemonToGuess: null,
      answers: [],
      headers: [
        { text: "Sprite", value: "sprite", sortable: false },
        { text: "N°", value: "id", sortable: false },
        { text: "Type(s)", value: "types", sortable: false },
        { text: "Couleur", value: "color", sortable: false },
        {
          text: "Gen",
          value: "generation",
          sortable: false,
        },
        {
          text: "Evo.",
          value: "is_evolution",
          sortable: false,
        },
        {
          text: "Leg/myth.",
          value: "is_leg_or_myth",
          sortable: false,
        },
      ],
      pokemonNameToVerify: "",
      error: "",
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
    };
  },
  mounted() {
    this.test();
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
		}
  },
  methods: {
    playAgain() {
      this.generatePokemon();
      this.answers = [];
    },
    async test() {
      try {
        this.pokemonToGuess = await PokeAPI.getPokemonByID(149);
      } catch (err) {
        this.error = err;
      }
    },
    async generatePokemon() {
      try {
        this.pokemonToGuess = await PokeAPI.generateRandomPokemon();
      } catch (err) {
        this.error = err;
        console.log(err);
      }
    },
    async verifyPokemon(name) {
      this.$refs.autocomplete.isMenuActive = false;
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
        this.answers.unshift(answer);
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
  },
  watch: {
    isPokemonGuessed(newValue) {
      if (newValue) {
        this.dialogEndGame = true;
        this.$confetti.start(this.particlesStyle);
        setTimeout(
          function () {
            this.$confetti.stop();
          }.bind(this),
          2500
        );
      }
    },
  },
};
</script>

<style lang="scss">
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  padding: 8px 6px 8px 0 !important;
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th:first-child {
  padding: 8px 6px 8px 8px !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 8px 6px 8px 0 !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:first-child {
  padding: 8px 0 8px 0 !important;
}
</style>