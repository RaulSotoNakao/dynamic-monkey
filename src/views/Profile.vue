<template>
  <v-container class="d-flex justify-center align-center mb-6">
    <v-card
      class="mx-auto"
      color="blue-grey lighten-4"
      elevation="10"
      shaped
      style="width: 100%"
    >
      <v-card-title>
        <v-icon large left> mdi-home-account </v-icon>
        <span class="text-h6 font-weight-light">Area Personal</span>
      </v-card-title>
      <v-divider></v-divider>

      <v-timeline dense>
        <v-timeline-item color="secondary" fill-dot icon="mdi-account-details">
          <user-form-data />
        </v-timeline-item>
        <v-timeline-item color="secondary" fill-dot icon="mdi-file-tree">
          <generator-form></generator-form>
        </v-timeline-item>
      </v-timeline>

      <v-divider></v-divider>

      <v-card-actions>
        <v-row align="center" justify="center"> </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import GeneratorForm from "../components/app-profile/GeneratorForm.vue";
import UserFormData from "../components/app-profile/UserFormData.vue";

export default {
  components: {
    "user-form-data": UserFormData,
    "generator-form": GeneratorForm,
  },
  data: () => ({}),
  computed: {},
  methods: {},
  mounted() {},
};
</script>

<style></style>
