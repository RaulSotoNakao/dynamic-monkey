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
        <v-icon large left> mdi-table-cog </v-icon>
        <span class="text-h6 font-weight-light">Generador</span>
      </v-card-title>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-4" color="secondary" dark>
            <v-card-title class="text-h6"> Datos disponibles </v-card-title>
            <v-row class="mx-3">
              <v-col cols="12" :xs="12" :sm="6" :md="6"> </v-col>
              <v-col cols="12" :xs="12" :sm="6" :md="6"> </v-col>
              <v-col cols="12"> </v-col>
              <v-col class="d-flex justify-end">
                <v-btn color="primary" class="mx-2" @click="() => {}">
                  Guardar
                  <v-icon right> mdi-content-save </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="ml-4" color="secondary" dark>
            <v-card-title class="text-h6">  </v-card-title>
            <v-treeview
              v-model="tree"
              :open="initiallyOpen"
              :items="items"
              activatable
              item-key="name"
              open-on-click
              dark
            >
              <template v-slot:prepend="{ item, open }">
                <v-icon v-if="!item.file">
                  {{ open ? "mdi-folder-open" : "mdi-folder" }}
                </v-icon>
                <v-icon v-else>
                  {{ files[item.file] }}
                </v-icon>
              </template>
            </v-treeview>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-row>
            <v-col cols="12">
              <v-card class="mr-4" color="secondary" dark>
                <v-card-title class="text-h6"> Template </v-card-title>
                <v-row class="">
                  <v-col cols="12" :xs="12" :sm="6" :md="6"> </v-col>
                  <v-col cols="12" :xs="12" :sm="6" :md="6"> </v-col>
                  <v-col cols="12"> </v-col>
                  <v-col class="d-flex justify-end">
                    <v-btn color="primary" class="mx-2" @click="() => {}">
                      Guardar
                      <v-icon right> mdi-content-save </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
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
    initiallyOpen: ["public"],
    files: {
      html: "mdi-language-html5",
      js: "mdi-nodejs",
      json: "mdi-code-json",
      md: "mdi-language-markdown",
      pdf: "mdi-file-pdf",
      png: "mdi-file-image",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel",
    },
    tree: [],
    items: [
      {
        name: ".git",
      },
      {
        name: "node_modules",
      },
      {
        name: "public",
        children: [
          {
            name: "static",
            children: [
              {
                name: "logo.png",
                file: "png",
              },
            ],
          },
          {
            name: "favicon.ico",
            file: "png",
          },
          {
            name: "index.html",
            file: "html",
          },
        ],
      },
      {
        name: ".gitignore",
        file: "txt",
      },
      {
        name: "babel.config.js",
        file: "js",
      },
      {
        name: "package.json",
        file: "json",
      },
      {
        name: "README.md",
        file: "md",
      },
      {
        name: "vue.config.js",
        file: "js",
      },
      {
        name: "yarn.lock",
        file: "txt",
      },
    ],

    snackbar: false,
    snackbarText: "",
  }),
  methods: {
    get() {
      window.ipc.send("SELECT_DIRECTORY");
    },
  },
};
</script>

<style></style>
