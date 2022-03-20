<template>
  <v-chip :color="isValid ? 'green' : 'grey'" small>
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