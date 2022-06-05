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
          <v-card class="mr-10" color="secondary" dark>
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
                  class="mx-2"
                  @click="() => saveUserData()"
                >
                  Guardar
                  <v-icon right> mdi-content-save </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-timeline-item>
        <v-timeline-item color="secondary" fill-dot icon="mdi-file-tree">
          <v-card class="mr-10" color="secondary" dark>
            <v-card-title class="text-h6">
              <v-row>
                <v-col>Generadores </v-col>
                <v-col>
                  <v-text-field
                    label="nombre"
                    :disabled="!existUrlDir"
                    v-model="newGroupName"
                    hint="cada nombre debe ser único ;)"
                    prepend-icon="mdi-table-cog "
                  >
                    <template v-slot:append-outer>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="createNewGenerator"
                            :disabled="!newGroupName"
                            small
                            text
                            color="primary"
                            class="ml-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-plus-box </v-icon>
                          </v-btn>
                        </template>
                        <span>Crear nuevo snippet</span>
                      </v-tooltip>
                      <!-- <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="() => {}"
                            small
                            text
                            color="primary"
                            class="ml-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-import</v-icon>
                          </v-btn>
                        </template>
                        <span>Importar snippet</span>
                      </v-tooltip> -->
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text class="subtitle-2 font-weight-bold">
              Bienvenido, ¡Aquí puedes administrar y crear Generadores!
            </v-card-text>

            <v-row class="d-flex justify-center align-center mb-6">
              <v-col class="mx-4">
                <v-card>
                  <v-data-table
                    class="secondary"
                    :headers="generatorHeaders"
                    :items="generatorList"
                  >
                    <!-- eslint-disable-next-line -->
                    <template v-slot:item.name="{ item }">
                      <v-chip dark>
                        <v-text-field
                          label="Regular"
                          placeholder="Placeholder"
                          v-model="item.name"
                        ></v-text-field>
                      </v-chip>
                    </template>
                    <!-- eslint-disable-next-line -->
                    <template v-slot:item.actions="{ item }">
                      <v-icon small class="mr-2" @click="updateGenerator(item)">
                        mdi-pencil
                      </v-icon>
                      <v-icon small @click="deleteGenerator(item)">
                        mdi-delete
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-timeline-item>
      </v-timeline>

      <v-divider></v-divider>
      <v-snackbar v-model="snackbar" :vertical="true">
        {{ snackbarText }}

        <template v-slot:action="{ attrs }">
          <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
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
export default {
  data: () => ({
    newGroupName: "",
    items: [
      {
        color: "red lighten-2",
        icon: "mdi-star",
      },
      {
        color: "purple darken-1",
        icon: "mdi-book-variant",
      },
      {
        color: "green lighten-1",
        icon: "mdi-airballoon",
      },
      {
        color: "indigo",
        icon: "mdi-buffer",
      },
    ],
    snackbar: false,
    snackbarText: "",
    generatorHeaders: [
      {
        text: "Nombre",
        align: "start",
        sortable: true,
        value: "name",
      },
      {
        text: "categorías",
        align: "start",
        sortable: false,
        value: "categories",
      },
      { text: "Acciones", value: "actions", align: "end", sortable: false },
    ],
    generatorList: [],
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
    existUrlDir() {
      return !!this.formData.urlDirectorioDeTrabajo;
    },
    icon() {
      return this.icons[this.iconIndex];
    },
  },
  methods: {
    isValidName(name) {
      if (this.generatorList.find((s) => s.name === name)) {
        this.snackbar = true;
        this.snackbarText = "Amigo... no se puede repetir el nombre.";

        return false;
      } else {
        return true;
      }
    },
    updateGenerator(item) {
      if (this.generatorList.filter((s) => s.name === item.name).length > 1) {
        this.snackbar = true;
        this.snackbarText = "Amigo... ¡Ya existe uno que se llama así!.";
      } else {
        window.ipc.send("UPDATE_GENERATOR", item);
      }
    },
    deleteGenerator(item) {
      window.ipc.send("DELETE_GENERATOR", item.id);
    },
    createNewGenerator() {
      if (this.isValidName(this.newGroupName)) {
        window.ipc.send("ADD_GENERATOR", {
          id: new Date().valueOf(),
          name: this.newGroupName,
          dirName: this.newGroupName,
          categories: [],
          templatesList: [],
        });
      }
    },
    saveUserData() {
      window.ipc.send("SAVE_USER_DATA", this.formData);
    },
    toggleMarker() {
      window.ipc.send("SELECT_DIRECTORY");
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
  },
  mounted() {
    window.ipc.send("USER_DATA");
    window.ipc.send("GENERATOR_LIST");

    window.ipc.on("SELECT_DIRECTORY", (payload) => {
      this.formData.urlDirectorioDeTrabajo = payload.selected_dir;
    });

    window.ipc.on("USER_DATA", (payload) => {
      this.formData = payload.content.userData;
    });
    window.ipc.on("GENERATOR_LIST", (payload) => {
      this.generatorList = payload.content.map(
        (generator) => generator.definition
      );
    });
  },
};
</script>

<style></style>
