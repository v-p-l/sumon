<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <Appbar />
    <v-main>
      <v-container fill-height class="d-flex flex-column align-start pa-4">
        <slot></slot>
      </v-container>
    </v-main>
		<Footer />
  </v-app>
</template>

<script>
import Appbar from "@/components/AppBar/AppBar.vue";
import Footer from "@/components/Footer/Footer.vue";

export default {
  components: {
    Appbar,
    Footer,
  },
  data() {
    return {};
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>