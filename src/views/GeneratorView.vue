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
          <data-generator />
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
                  :selectedData="selectedGenerator"
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

      <v-card-actions>
        <v-row align="center" justify="center"> </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import FolderStructure from "../components/app-generator/FolderStructure.vue";
import EditorGenerator from "../components/app-generator/EditorGenerator.vue";
import DataGenerator from '../components/app-generator/dataGenerator.vue';
import { mapActions, mapGetters} from 'vuex'

export default {
  components: {
    "folder-structure": FolderStructure,
    "editor-generator": EditorGenerator,
    DataGenerator,
  },
  data: () => ({
    selectedAction: "",
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
    isLoading: true,
    activeFile: {},
  }),
  computed: {
    ...mapActions(["selectedGenerator"]), 
  },
  methods: {
    ...mapActions(["UPDATE_SELECTED_GENERATOR"]), 
    onselectedFile(selectedFile) {
      this.activeFile = selectedFile;
      this.editorGeneratorUpdater = this.editorGeneratorUpdater + 1;
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
    window.ipc.send("GET_GENERATOR", this.$route.params.name);
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
      this.UPDATE_SELECTED_GENERATOR(payload.content)
    });
  },
};
</script>

<style></style>
