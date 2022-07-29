<template>
  <v-card class="mx-auto" style="width: 100%">
    <v-card-title>
      <v-icon large left> mdi-home-account </v-icon>
      <span class="text-h6 font-weight-light">Area Personal</span>
    </v-card-title>

    <v-timeline dense>
      <v-timeline-item color="secondary" fill-dot>
        <template v-slot:icon>
          <v-icon>mdi-account-details</v-icon>
        </template>

        <user-form-data />
      </v-timeline-item>
      <v-timeline-item color="secondary" fill-dot>
        <template v-slot:icon>
          <v-icon>mdi-file-tree</v-icon>
        </template>

        <generator-form></generator-form>
      </v-timeline-item>
    </v-timeline>
  </v-card>
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
