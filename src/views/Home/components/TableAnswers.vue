<template>
  <v-data-table
    :headers="headers"
    :items="answers"
    item-class="spacing"
    hide-default-footer
    no-data-text=""
    dense
    mobile-breakpoint="800"
  >
    <!-- Headers -->
    <template v-slot:[`header.sprite`]="{}">
      <span>{{ headerSpriteTranslated }}</span>
    </template>
    <template v-slot:[`header.id`]="{}">
      <span>{{ headerIDTranslated }}</span>
    </template>
    <template v-slot:[`header.types`]="{}">
      <span>{{ headerTypesTranslated }}</span>
    </template>
    <template v-slot:[`header.color`]="{}">
      <span>{{ headerColorTranslated }}</span>
    </template>
    <template v-slot:[`header.is_evolution`]="{}">
      <span>{{ headerIsEvoTranslated }}</span>
    </template>
    <template v-slot:[`header.is_leg_or_myth`]="{}">
      <span>{{ headerIsLegOrMythTranslated }}</span>
    </template>
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
      <div class="d-flex flex-row" style="gap: 4px">
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
    <!-- <template v-slot:[`item.generation`]="{ item }">
      <ChipAnswerGen
        :guessGen="pokemonToGuess.generation"
        :answerGen="item.generation"
      />
    </template> -->
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
</template>

<script>
import ChipAnswerID from "@/components/Chips/Answer/ChipAnswerID.vue";
import ChipAnswerType from "@/components/Chips/Answer/ChipAnswerType.vue";
import ChipAnswerColor from "@/components/Chips/Answer/ChipAnswerColor.vue";
// import ChipAnswerGen from "@/components/Chips/Answer/ChipAnswerGen.vue";
import ChipAnswerIsEvo from "@/components/Chips/Answer/ChipAnswerIsEvo.vue";
import ChipAnswerIsLegOrMyth from "@/components/Chips/Answer/ChipAnswerIsLegOrMyth.vue";

export default {
  components: {
    ChipAnswerType,
    ChipAnswerColor,
    // ChipAnswerGen,
    ChipAnswerIsEvo,
    ChipAnswerIsLegOrMyth,
    ChipAnswerID,
  },
  props: {
    answers: Array,
    pokemonToGuess: Object,
  },
  data() {
    return {
      headers: [
        {
          text: "",
          value: "sprite",
          sortable: false,
        },
        { text: "", value: "id", sortable: false },
        { text: "", value: "types", sortable: false },
        { text: "", value: "color", sortable: false },
        {
          text: "",
          value: "is_evolution",
          sortable: false,
        },
        {
          text: "",
          value: "is_leg_or_myth",
          sortable: false,
        },
      ],
    };
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
    headerSpriteTranslated() {
      return this.$t('game.properties.sprite');
    },
    headerIDTranslated() {
      return this.$t('game.properties.id');
    },
    headerTypesTranslated() {
      return this.$t('game.properties.type.title');
    },
    headerColorTranslated() {
      return this.$t('game.properties.color.title');
    },
    headerIsEvoTranslated() {
      return this.$t('game.properties.is_evolution.title');
    },
    headerIsLegOrMythTranslated() {
      return this.$t('game.properties.is_leg_or_myth.title');
    }
  },
  mounted() {
    this.headers[0].text = this.$t('game.properties.sprite');
    this.headers[1].text = this.$t('game.properties.id');
    this.headers[2].text = this.$t('game.properties.type.title');
    this.headers[3].text = this.$t('game.properties.color.title');
    this.headers[4].text = this.$t('game.properties.is_evolution.title');
    this.headers[5].text = this.$t('game.properties.is_leg_or_myth.title');
  },
  methods: {},
  watch: {
    headerSpriteTranslated(newValue) {
      this.headers[0].text = newValue;
    },
    headerIDTranslated(newValue) {
      this.headers[1].text = newValue;
    },
    headerTypesTranslated(newValue) {
      this.headers[2].text = newValue;
    },
    headerColorTranslated(newValue) {
      this.headers[3].text = newValue;
    },
    headerIsEvoTranslated(newValue) {
      this.headers[4].text = newValue;
    },
    headerIsLegOrMythTranslated(newValue) {
      this.headers[5].text = newValue;
    }
  }
};
</script>

<style lang="scss">
// .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
//   padding: 8px 6px 8px 0 !important;
// }
// .v-data-table > .v-data-table__wrapper > table > thead > tr > th:first-child {
//   padding: 4px 6px 4px 8px !important;
// }
// .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
//   padding: 4px 6px 4px 0 !important;
// }
// .v-data-table > .v-data-table__wrapper > table > tbody > tr > td:first-child {
//   padding: 4px 0 4px 0 !important;
// }
</style>