<template>
  <v-chip :color="isGuessFound ? guessTypeToColor : 'grey'" small class="px-2">
    <span :class="isGuessFound ? 'white--text text-capitalize' : 'black--text'">
      {{
        isGuessFound
          ? translatedGuessType
          : $t("game.properties.type.title") + " " + number
      }}
    </span>
  </v-chip>
</template>

<script>
export default {
  props: {
    guessType: String,
    answersTypes: Array,
    number: Number,
  },
  data() {
    return {
      typesColors: [
        {
          type: "normal",
          color: "#A9A67B",
        },
        {
          type: "fighting",
          color: "#C22F28",
        },
        {
          type: "flying",
          color: "#AA8CFF",
        },
        {
          type: "poison",
          color: "#A23EA0",
        },
        {
          type: "ground",
          color: "#E2BF65",
        },
        {
          type: "rock",
          color: "#B6A03A",
        },
        {
          type: "bug",
          color: "#A5B91A",
        },
        {
          type: "ghost",
          color: "#745797",
        },
        {
          type: "steel",
          color: "#B7B8CD",
        },
        {
          type: "fire",
          color: "#EF802E",
        },
        {
          type: "water",
          color: "#658CFD",
        },
        {
          type: "grass",
          color: "#7BC74B",
        },
        {
          type: "electric",
          color: "#F2D421",
        },
        {
          type: "psychic",
          color: "#F45586",
        },
        {
          type: "ice",
          color: "#97D9D7",
        },
        {
          type: "dragon",
          color: "#7134FC",
        },
        {
          type: "dark",
          color: "#715746",
        },
        {
          type: "fairy",
          color: "#D685AD",
        },
      ],
    };
  },
  computed: {
    isGuessFound() {
      return this.answersTypes.includes(this.guessType);
    },
    translatedGuessType() {
      return this.$t("game.properties.type." + this.guessType);
    },
    guessTypeToColor() {
      return this.typeToColor(this.guessType);
    },
  },
  methods: {
    typeToColor(pokemonType) {
      const type = this.typesColors.find((x) => x.type === pokemonType);
      if (type) {
        return type.color;
      } else {
        throw "Ce type n'existe pas.";
      }
    },
  },
};
</script>