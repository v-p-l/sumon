<template>
  <v-chip :color="isValid ? 'green' : 'grey'" small class="px-2">
    <span>{{ isLegOrMyth ? "oui" : "non" }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
    isValid: Boolean,
    isLegOrMyth: Boolean,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>