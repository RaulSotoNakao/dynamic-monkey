<template>
  <v-card class="mr-10" color="secondary">
    <v-card-title class="text-h6"> Datos del usuario </v-card-title>
    <v-row class="mx-3">
      <v-col cols="12" :xs="12" :sm="6" :md="6">
        <v-text-field
          label="Nombre"
          v-model="formData.userName"
          prepend-inner-icon="mdi-account-arrow-right-outline"
        />
      </v-col>
      <v-col cols="12" :xs="12" :sm="6" :md="6">
        <v-text-field
          label="Apellidos"
          v-model="formData.lastName"
          prepend-inner-icon="mdi-account-arrow-left-outline"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="formData.urlDirectorioDeTrabajo"
          append-outer-icon="mdi-briefcase-search"
          :prepend-inner-icon="icon"
          label="URL Directorio de trabajo"
          type="text"
          @click:append-outer="toggleMarker"
          @click:prepend-inner="changeIcon"
          readonly
          color="black"
          class="url-workspace"
        ></v-text-field>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn
          color="primary"
          :disabled="
            !formData.urlDirectorioDeTrabajo ||
            !formData.urlDirectorioDeTrabajo ||
            !formData.lastName
          "
          class="mx-2"
          @click="() => saveUserData()"
        >
          Guardar
          <v-icon right> mdi-content-save </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    formData: {
      userName: "",
      lastName: "",
      urlDirectorioDeTrabajo: "",
    },
    iconIndex: 0,
    icons: [
      "mdi-emoticon",
      "mdi-emoticon-cool",
      "mdi-emoticon-dead",
      "mdi-emoticon-excited",
      "mdi-emoticon-happy",
      "mdi-emoticon-neutral",
      "mdi-emoticon-sad",
      "mdi-emoticon-tongue",
    ],
  }),
  computed: {
    ...mapGetters(["userData"]),
    icon() {
      return this.icons[this.iconIndex];
    },
    existUrlDir() {
      return !!this.formData.urlDirectorioDeTrabajo;
    },
  },
  methods: {
    ...mapActions(["UPDATE_USER_DATA", "SHOW_MESSAGE_BOX_SUCCESS"]),
    saveUserData() {
      window.ipc
        .SAVE_USER_DATA({ ...this.formData })
        .then((payload) => this.UPDATE_USER_DATA(payload))
        .then(() =>
          this.SHOW_MESSAGE_BOX_SUCCESS(
            "los datos se han guardado correctamente :)"
          )
        );
    },
    toggleMarker() {
      window.ipc.SELECT_DIRECTORY().then((payload) => {
        this.formData.urlDirectorioDeTrabajo = payload.selected_dir;
      });
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
  },
  mounted() {
    this.formData = this.userData || {};
  },
};
</script>

<style></style>
