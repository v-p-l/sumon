<template>
  <component :is="resolveLayout">
    <v-slide-x-transition mode="out-in">
      <router-view></router-view>
    </v-slide-x-transition>
  </component>
</template>

<script>
import LayoutBlank from "@/layouts/Blank.vue";
import LayoutContent from "@/layouts/Content.vue";
import { mapGetters } from "vuex";

export default {
  name: "Sumon",
  components: {
    LayoutBlank,
    LayoutContent,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("utilities", ["darkMode", "lang"]),
    resolveLayout() {
      if (this.$route.meta.layout === "blank" || this.$route.name === null) {
        return "layout-blank";
      } else {
        return "layout-content";
      }
    },
  },
  async mounted() {
    this.darkMode === true
      ? (this.$vuetify.theme.dark = true)
      : (this.$vuetify.theme.dark = false);
    this.$i18n.locale = this.lang;
  },
};
</script>
