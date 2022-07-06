<template>
  <v-container class="d-flex justify-center align-center mb-6">
    <v-card
      class="mx-auto"
      color="blue-grey lighten-4"
      elevation="10"
      shaped
      style="width: 100%"
      :disabled="isLoading"
      :loading="isLoading"
    >
      <v-card-title>
        <v-icon large left> mdi-table-cog </v-icon>
        <span class="text-h6 font-weight-light">Generador</span>
      </v-card-title>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-4" color="secondary" dark>
            <v-card-title class="text-h6">
              Datos disponibles
              <v-menu
                :close-on-content-click="false"
                :nudge-width="200"
                offset-x
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    x-small
                    icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon> mdi-plus-box </v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>¡A crear nuevos datos!</v-card-title>
                  <v-list-item-content>
                    <v-row class="mx-2 secondary rounded-lg">
                      <v-col cols="6">
                        <v-text-field
                          :label="'Crear nuevo objeto'"
                          v-model="newObjectData.key"
                          type="text"
                          :color="'primary'"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          append-outer-icon="mdi-plus-circle"
                          label="valor a utilizar"
                          type="text"
                          v-model="newObjectData.value"
                          :disabled="!newObjectData.key"
                          @click:append-outer="addNewObject()"
                          :color="'primary'"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-row class="d-flex justify-center align-center mt-1">
                      <v-col class="mx-2">
                        <v-card>
                          <v-data-table
                            class="secondary"
                            :headers="newListHeaders"
                            :items="newListData.list"
                          >
                            <template v-slot:top>
                              <v-row class="mx-2">
                                <v-col cols="6">
                                  <v-text-field
                                    :label="'nombre de la lista'"
                                    v-model="newListData.key"
                                    type="text"
                                    :color="'primary'"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                  <v-text-field
                                    append-outer-icon="mdi-plus-circle"
                                    label="añadir nueva cabecera"
                                    type="text"
                                    v-model="newHeader"
                                    :disabled="!newListData.key"
                                    @click:append-outer="addNewHeader()"
                                    :color="'primary'"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </template>

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
                              <v-icon
                                small
                                class="mr-2"
                                @click="updateGenerator(item)"
                              >
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
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-row class="mx-2 mb-1 secondary rounded-lg">
                      <v-col>
                        <v-textarea
                          label="JSON DATA"
                          append-outer-icon="mdi-plus-circle"
                          v-model="newJsonData"
                          @click:append-outer="addNewJsonData()"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-card>
              </v-menu>
            </v-card-title>
            <v-row class="mx-3">
              <v-col cols="12">
                <v-chip-group active-class="primary--text" column>
                  <v-chip
                    v-for="(value, key) in templateDefinitions"
                    :key="key"
                  >
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          color="primary"
                          :style="`width: 10rem`"
                          v-bind="attrs"
                          v-on="on"
                          @click="() => handleSelectedData(key)"
                        >
                          {{ key }}
                        </v-btn>
                      </template>
                      <span>{{ value }}</span>
                    </v-tooltip>
                  </v-chip>
                </v-chip-group>
              </v-col>
              <v-col cols="12" :xs="12" :sm="6" :md="6"> </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="ml-4" color="secondary" dark>
            <v-card-title class="text-h6"></v-card-title>
            <folder-structure
              :templateList="templateList"
              @activeFile="(selectedFile) => onselectedFile(selectedFile)"
              @addNewItem="addNewItem"
              @deleteItem="deleteItem"
            />
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-row v-show="activeFile.name">
            <v-col cols="12">
              <v-card class="mr-4" color="secondary" dark>
                <v-card-title class="text-h6">{{
                  activeFile.name + "." + activeFile.file
                }}</v-card-title>
                <editor-generator
                  v-if="!!activeFile.template"
                  :updater="editorGeneratorUpdater"
                  :selectedFile="activeFile"
                  :selectedData="selectedData"
                ></editor-generator>

                <v-row>
                  <v-col class="d-flex justify-end mt-2">
                    <v-btn
                      color="primary"
                      class="mx-2"
                      @click="() => saveTemplate()"
                    >
                      Guardar template
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
import FolderStructure from "../components/FolderStructure.vue";
import EditorGenerator from "../components/EditorGenerator.vue";

export default {
  components: {
    "folder-structure": FolderStructure,
    "editor-generator": EditorGenerator,
  },
  data: () => ({
    newHeader: "",
    newListHeaders: [],
    editorGeneratorUpdater: 0,
    selectedAction: "",
    selectedData: {},
    newObjectData: { key: "", value: "" },
    newListData: { key: "", list: [] },
    newJsonData: "",
    templateDefinitions: {},
    templateList: [
      {
        id: "base",
        name: "base-dir",
        children: [
          {
            file: "js",
            id: "247920733327152",
            name: "tete",
            template: `;`,
          },
        ],
      },
    ],
    snackbar: false,
    snackbarText: "",
    isLoading: true,
    activeFile: {},
  }),
  computed: {},
  methods: {
    addNewHeader() {
      this.newListHeaders = [
        ...this.newListHeaders,
        {
          text: this.newHeader,
          align: "start",
          value: this.newHeader,
        },
      ];
    },
    onselectedFile(selectedFile) {
      this.activeFile = selectedFile;
      this.editorGeneratorUpdater = this.editorGeneratorUpdater + 1;
    },
    handleSelectedData(key) {
      const data = {};
      data[key] = this.templateDefinitions[key];
      this.selectedData = data;
      this.editorGeneratorUpdater = this.editorGeneratorUpdater + 1;
    },
    addNewJsonData() {
      try {
        const newData = JSON.parse(this.newJsonData);
        this.templateDefinitions = { ...this.templateDefinitions, ...newData };
      } catch (error) {
        this.snackbar = true;
        this.snackbarText = error;
      }
    },
    addNewDataList() {},
    addNewObject() {
      const newData = {};
      newData[this.newObjectData.key] = this.newObjectData.value;

      this.templateDefinitions = { ...this.templateDefinitions, ...newData };
      this.newObjectData.key = "";
      this.newObjectData.value = "";
    },
    saveTemplate() {
      this.recursiveUpdateTemplate(this.templateList, this.activeFile.id);
    },
    recursiveUpdateTemplate(list, id) {
      return list.map((item) => {
        if (item.id === id) {
          item.template = this.activeFile.template;
        } else if (item.children && item.children.length) {
          item.childer = this.recursiveUpdateTemplate(item.children, id);
        }
        return item;
      });
    },
    recursiveRemove(list, id) {
      return list.filter((item) => {
        if ("children" in item) {
          item.children = this.recursiveRemove(item.children, id);
        }
        return item.id !== id;
      });
    },
    recursiveAdd(list, id, itemToAdd) {
      return list.map((item) => {
        if (item.id === id) {
          item.children = [itemToAdd, ...item.children];
        } else if (item.children && item.children.length) {
          item.childer = this.recursiveAdd(item.children, id, itemToAdd);
        }
        return item;
      });
    },

    deleteItem(id) {
      this.templateList = this.recursiveRemove(this.templateList, id);
    },
    addNewItem({ id, itemToAdd }) {
      this.templateList = this.recursiveAdd(this.templateList, id, itemToAdd);
    },
  },
  mounted() {},
  created() {
    //on first time
    window.ipc.send("GET_GENERATOR", this.$route.params);
    //on change params
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        this.isLoading = true;
        window.ipc.send("GET_GENERATOR", toParams.name);
      }
    );
    window.ipc.on("GET_GENERATOR", (payload) => {
      this.isLoading = false;
      // this.templateList = payload.content;
    });
  },
};
</script>

<style></style>
