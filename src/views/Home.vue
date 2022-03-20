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
          <v-avatar
            v-else
            size="100"
            style="top: 10%; left: 15%"
            color="black"
          ></v-avatar>
        </v-row>
      </v-container>
    </v-img>
    <v-row v-if="!isPokemonGuessed" no-gutters class="align-center">
      <v-text-field
        v-model="pokemonNameToVerify"
        outlined
        dense
        hide-details
        type="text"
        label="Nom du pokémon"
        class="mr-2"
        @keyup.enter="verifyPokemon(pokemonNameToVerify.toLowerCase())"
      ></v-text-field>
      <v-btn
        color="primary"
        @click="verifyPokemon(pokemonNameToVerify.toLowerCase())"
      >
        <v-icon v-if="!loading" color="white">mdi-arrow-left-bottom</v-icon>
        <IconLoading v-else />
      </v-btn>
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
      <!-- Types -->
      <template v-slot:[`item.types`]="{ item }">
        <div class="d-flex flex-column" style="gap: 4px">
          <div v-for="(type, i) in item.types" :key="i">
            <ChipType
              :isValid="pokemonToGuess.types.includes(type)"
              :pokemonType="type"
            />
          </div>
        </div>
      </template>
      <!-- Color -->
      <template v-slot:[`item.color`]="{ item }">
        <ChipColor
          :isValid="item.color === pokemonToGuess.color"
          :pokemonColor="item.color"
        />
      </template>
      <!-- Generation -->
      <template v-slot:[`item.generation`]="{ item }">
        <ChipGeneration
          :isValid="item.generation === pokemonToGuess.generation"
          :pokemonGen="item.generation"
        />
      </template>
      <!-- Is evolution -->
      <template v-slot:[`item.is_evolution`]="{ item }">
        <ChipIsEvolution
          :isValid="item.is_evolution === pokemonToGuess.is_evolution"
          :isEvolution="item.is_evolution"
        />
      </template>
      <!-- Is legendary or mythical -->
      <template v-slot:[`item.is_leg_or_myth`]="{ item }">
        <ChipIsLegOrMyth
          :isValid="item.is_leg_or_myth === pokemonToGuess.is_leg_or_myth"
          :isLegOrMyth="item.is_leg_or_myth"
        />
      </template>
    </v-data-table>
    <v-dialog v-model="dialogEndGame" width="450">
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
import ChipType from "@/components/Chips/ChipType.vue";
import ChipColor from "@/components/Chips/ChipColor.vue";
import ChipGeneration from "@/components/Chips/ChipGeneration.vue";
import ChipIsEvolution from "@/components/Chips/ChipIsEvolution.vue";
import ChipIsLegOrMyth from "@/components/Chips/ChipIsLegOrMyth.vue";
import IconLoading from "@/components/Icons/IconLoading.vue";

export default {
  name: "Sumon",
  components: {
    ChipType,
    ChipColor,
    ChipGeneration,
    ChipIsEvolution,
    ChipIsLegOrMyth,
    IconLoading,
  },
  mixins: [],
  data() {
    return {
      pokemonToGuess: null,
      answers: [],
      headers: [
        { text: "Sprite", value: "sprite", sortable: false },
        { text: "Type(s)", value: "types", sortable: false },
        { text: "Couleur", value: "color", sortable: false },
        {
          text: "Gen",
          value: "generation",
          sortable: false,
        },
        {
          text: "Evolution",
          value: "is_evolution",
          sortable: false,
        },
        {
          text: "Leg. ou myth.",
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
    };
  },
  mounted() {
    this.test();
  },
  computed: {
    isPokemonGuessed() {
      return this.answers.some((x) => x.id === this.pokemonToGuess.id);
    },
  },
  methods: {
    playAgain() {
      this.generatePokemon();
      this.answers = [];
    },
    async test() {
      try {
        this.pokemonToGuess = await PokeAPI.getPokemonByID(150);
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
      this.loading = true;

      const alreadyVerified = this.answers.find((x) => x.french_name === name);
      if (alreadyVerified) {
        this.verifyError = "Pokémon déjà vérifié.";
        this.loading = false;
        return;
      }

      try {
        const translatedPokemonName = await PokeAPI.translatePokemonName(name);
        const id = await PokeAPI.getPokemonIDByName(translatedPokemonName);
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
    playConfetti() {
      this.$confetti.start();
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
  padding: 8px 6px 8px 0 !important;
}
</style>