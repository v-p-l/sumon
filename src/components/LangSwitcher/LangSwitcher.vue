<template>
  <v-menu offset-y bottom left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon style="font-size: 18px" v-bind="attrs" v-on="on">
        <flag :iso="convertLangToIso(lang)" :squared="false" />
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        style="font-size: 18px"
        @click="updateLocaleLang(item.value)"
      >
        <div class="d-flex flex-row">
          <flag :iso="item.iso" :squared="false" />
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      items: [
        { iso: "fr", value: "fr" },
        { iso: "us", value: "en" },
        { iso: "jp", value: "ja" },
        // { title: "Chinese", iso: "cn", value: "cn" },
      ],
    };
  },
  computed: {
    ...mapGetters("utilities", ["lang"]),
  },
  methods: {
    ...mapActions("utilities", ["changeLanguage"]),
    updateLocaleLang(lang) {
      this.changeLanguage(lang);
    },
    convertLangToIso(lang) {
      switch (true) {
        case lang === "en":
          return "us";
        case lang === "ja":
          return "jp";
        default:
          return lang;
      }
    }
  },
};
</script>