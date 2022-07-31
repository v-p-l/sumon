<template>
  <v-app-bar app flat clipped-left color="background" class="px-4">
    <!-- <v-img
      :src="require('@/assets/logo.svg')"
      max-height="30px"
      max-width="30px"
      alt="logo"
      contain
    ></v-img> -->
    <v-toolbar-title class="font-weight-medium pl-2">Sumon</v-toolbar-title>
    <v-spacer></v-spacer>
    <LangSwitcher />
    <ThemeSwitcher />
  </v-app-bar>
</template>

<script>
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher.vue";
import LangSwitcher from "@/components/LangSwitcher/LangSwitcher.vue";

export default {
  components: {
    ThemeSwitcher,
    LangSwitcher,
  },
  data() {
    return {};
  },
};
</script>