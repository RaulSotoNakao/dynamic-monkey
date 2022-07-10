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
        <v-col cols="4">
          <v-col cols="12">
            <data-generator />
          </v-col>

          <v-col cols="12">
            <v-card color="secondary" dark>
              <v-card-title class="text-h6"></v-card-title>
              <folder-structure />
            </v-card>
          </v-col>
        </v-col>
        <v-col cols="8">
          <editor-generator></editor-generator>
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
import DataGenerator from "../components/app-generator/dataGenerator.vue";
import { mapActions, mapGetters } from "vuex";

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
    isLoading: true,
    activeFile: {},
  }),
  computed: {
    ...mapActions(["selectedGenerator"]),
  },
  methods: {
    ...mapActions(["UPDATE_SELECTED_GENERATOR"]),
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
      this.UPDATE_SELECTED_GENERATOR(payload.content);
    });
  },
};
</script>

<style></style>
