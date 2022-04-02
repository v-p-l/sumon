<template>
  <v-data-table
    :headers="headers"
    :items="answers"
    item-class="spacing"
    hide-default-footer
    no-data-text="Réponses"
    mobile-breakpoint="0"
    dense
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
</template>

<script>
import ChipAnswerID from "@/components/Chips/Answer/ChipAnswerID.vue";
import ChipAnswerType from "@/components/Chips/Answer/ChipAnswerType.vue";
import ChipAnswerColor from "@/components/Chips/Answer/ChipAnswerColor.vue";
import ChipAnswerGen from "@/components/Chips/Answer/ChipAnswerGen.vue";
import ChipAnswerIsEvo from "@/components/Chips/Answer/ChipAnswerIsEvo.vue";
import ChipAnswerIsLegOrMyth from "@/components/Chips/Answer/ChipAnswerIsLegOrMyth.vue";

export default {
  components: {
    ChipAnswerType,
    ChipAnswerColor,
    ChipAnswerGen,
    ChipAnswerIsEvo,
    ChipAnswerIsLegOrMyth,
    ChipAnswerID
  },
  props: {
    answers: Array,
    pokemonToGuess: Object
  },
  data() {
    return {
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
          text: "Evolution",
          value: "is_evolution",
          sortable: false,
        },
        {
          text: "Leg/myth.",
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
  },
  methods: {},
};
</script>

<style lang="scss">
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  padding: 4px 6px 4px 0 !important;
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th:first-child {
  padding: 4px 6px 4px 8px !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 4px 6px 4px 0 !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:first-child {
  padding: 4px 0 4px 0 !important;
}
</style>