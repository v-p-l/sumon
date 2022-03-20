<template>
  <v-chip :color="isValid ? 'green' : 'grey'" small>
		<span>{{ isEvolution ? "oui" : "non" }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
    isValid: Boolean,
    isEvolution: Boolean,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>