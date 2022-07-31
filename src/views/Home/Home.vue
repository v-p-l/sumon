<template>
  <v-container v-if="!loading" style="max-width: 1000px" class="pa-0">
    <CardPokemon
      :pokemonToGuess="pokemonToGuess"
      :answers="challengeOfTheDayAnswers"
      :isPokemonGuessed="challengeOfTheDayGuessed"
      :isGameEnded="challengeOfTheDayEnded"
      @openStatsDialog="showDialogEndGame = true"
    />
    <v-autocomplete
      v-if="!challengeOfTheDayEnded"
      v-model="pokemonNameToVerify"
      :items="pokemonsName"
      hide-details
      flat
      hide-no-data
      filled
      dense
      auto-select-first
      :menu-props="{ closeOnContentClick: true, maxHeight: 136 }"
      :label="$t('game.autocompleteLabel')"
      color="dark"
    >
      <template #item="{ item }">
        <v-list-item dense class="d-flex" @click="verifyPokemon(item)">
          <div class="ml-2">{{ item }}</div>
        </v-list-item>
      </template>
    </v-autocomplete>
    <small v-if="alreadyVerifiedError" class="red--text">{{ $t('game.autocompleteErrors.alreadyVerified') }}</small>
    <TableAnswers
      :answers="challengeOfTheDayAnswers"
      :pokemonToGuess="pokemonToGuess"
    />
    <DialogEndGame
      v-model="showDialogEndGame"
      :pokemonToGuess="pokemonToGuess"
      :answers="challengeOfTheDayAnswers"
      :isPokemonGuessed="challengeOfTheDayGuessed"
      :isGameEnded="challengeOfTheDayEnded"
      :limitTry="limitTry"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import PokeAPI from "@/services/PokeAPI";
import PokemonsName from "@/traductions/pokemons.json";
import CardPokemon from "@/views/Home/components/CardPokemon.vue";
import TableAnswers from "@/views/Home/components/TableAnswers.vue";
import DialogEndGame from "@/views/Home/components/DialogEndGame.vue";

export default {
  name: "Sumon",
  components: {
    CardPokemon,
    TableAnswers,
    DialogEndGame,
  },
  mixins: [],
  data() {
    return {
      loading: true,
      pokemonToGuess: null,
      pokemonNameToVerify: "",
      alreadyVerifiedError: false,
      limitTry: 6,
      showDialogEndGame: false,
      particlesStyle: {
        particles: [
          {
            type: "rect",
          },
        ],
        defaultColors: ["red", "blue", "yellow"],
        defaultSize: 6,
      },
    };
  },
  async mounted() {
    this.startGame();
  },
  computed: {
    ...mapGetters("game", [
      "challengeOfTheDayID",
      "challengeOfTheDayPokemonID",
      "challengeOfTheDayAnswers",
      "challengeOfTheDayEnded",
      "challengeOfTheDayGuessed",
      "lastUpdate",
    ]),
    ...mapGetters("utilities", ["lang"]),
    pokemonsName() {
      return PokemonsName.map((x) => x[this.lang]);
    },
  },
  methods: {
    ...mapActions("game", ["getChallengeOfTheDay"]),
    ...mapMutations("game", ["addChallengeOfTheDayAnswer"]),
    async startGame() {
      const timeNow = this.$moment(new Date()).format("DD/MM/YYYY");
      if (timeNow != this.lastUpdate) {
        try {
          const id = await this.getChallengeOfTheDay(timeNow);
          this.pokemonToGuess = await PokeAPI.getPokemonByID(id);
          this.loading = false;
        } catch (err) {
          console.log(err);
          this.loading = false;
        }
      } else {
        try {
          this.pokemonToGuess = await PokeAPI.getPokemonByID(
            this.challengeOfTheDayPokemonID
          );
          this.loading = false;
        } catch (err) {
          console.log(err);
          this.loading = false;
        }
      }
    },
    async verifyPokemon(name) {
      try {
        const id = await PokeAPI.pokemonNameToID(name, this.lang);

        const alreadyVerified = this.challengeOfTheDayAnswers.find(
          (x) => x.id === id
        );
        if (alreadyVerified) {
          this.alreadyVerifiedError = true;
          return;
        }

        const answer = await PokeAPI.getPokemonByID(id);
        this.addChallengeOfTheDayAnswer(answer);
        this.pokemonNameToVerify = "";
        this.alreadyVerifiedError = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
  watch: {
    challengeOfTheDayEnded(newValue) {
      if (newValue) {
        this.showDialogEndGame = true;
        if (this.challengeOfTheDayGuessed) {
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