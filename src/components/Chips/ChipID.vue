<template>
  <v-chip :color="isValid ? 'green' : 'grey'" small class="px-2">
		<span>{{ id }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
    isValid: Boolean,
    id: Number,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>