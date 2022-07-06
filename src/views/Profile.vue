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
          <user-form-data @showSucces="handleSuccesMessage" />
        </v-timeline-item>
        <v-timeline-item color="secondary" fill-dot icon="mdi-file-tree">
          <generator-form
            @showError="errorHandler"
            @showSucces="handleSuccesMessage"
          ></generator-form>
        </v-timeline-item>
      </v-timeline>

      <v-divider></v-divider>
      <v-snackbar v-model="snackbar" :color="snackBarType" :vertical="true">
        {{ snackbarText }}

        <template v-slot:action="{ attrs }">
          <v-btn
            :color="snackBarType === 'secondary' ? 'primary' : 'secondary'"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            cerrar
          </v-btn>
        </template>
      </v-snackbar>

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
  data: () => ({
    snackbar: false,
    snackbarText: "",
    snackBarType: "",
  }),
  computed: {},
  methods: {
    errorHandler(text) {
      this.snackbar = true;
      this.snackbarText = text;
      this.snackBarType = "primary";
    },
    handleSuccesMessage(text) {
      this.snackbar = true;
      this.snackbarText = text;
      this.snackBarType = "secondary";
    },
  },
  mounted() {},
};
</script>

<style></style>
