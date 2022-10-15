<template>
  <v-container
    class="pt-6"
    style="width: 100%; height: 100%"
    :disabled="isLoading"
    :loading="isLoading"
    tile
  >
    <v-row class="header-app">
      <v-col>
        <v-icon large left color="primary"> mdi-table-cog </v-icon>
        <span>Generador</span>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn color="primary" class="mx-2" @click="() => executeGenerator()">
          <span class="background--text"> Generar estructura </span>

          <v-icon right color="background"> mdi-eye </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col :sm="12" md="4">
        <v-row>
          <v-col :cols="12">
            <c-container>
              <template v-slot:header> Estructura de ficheros </template>

              <folder-structure />
            </c-container>
          </v-col>
          <v-col :cols="12">
            <data-structure />
          </v-col>
        </v-row>
      </v-col>
      <v-col :sm="12" md="8">
        <editor-generator></editor-generator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FolderStructure from "../components/app-generator/folder-generator/FolderStructure.vue";
import EditorGenerator from "../components/app-generator/editor-generator/EditorGenerator.vue";
import { mapActions, mapGetters } from "vuex";
import DataStructure from "../components/app-generator/data-generator/DataStructure.vue";

export default {
  components: {
    "folder-structure": FolderStructure,
    "editor-generator": EditorGenerator,
    "data-structure": DataStructure,
  },
  data: () => ({
    isLoading: true,
  }),
  computed: {
    ...mapGetters(["selectedGenerator"]),
  },
  methods: {
    ...mapActions([
      "UPDATE_SELECTED_GENERATOR",
      "UPDATE_SELECTED_DATA",
      "UPDATE_SELECTED_TEMPLATE",
    ]),
    executeGenerator() {
      window.ipc.GENERATE_STRUCTURE_GENERATOR({
        selectedGenerator: this.selectedGenerator,
      });
    },
  },
  mounted() {},
  created() {
    //on first time
    window.ipc.GET_GENERATOR(this.$route.params.name).then((payload) => {
      this.isLoading = false;
      this.UPDATE_SELECTED_GENERATOR(payload.content);
    });

    //on change params
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        this.isLoading = true;
        window.ipc.GET_GENERATOR(toParams.name).then((payload) => {
          this.isLoading = false;
          this.UPDATE_SELECTED_GENERATOR(payload.content);
        });

        this.UPDATE_SELECTED_DATA({});
        this.UPDATE_SELECTED_TEMPLATE({});
      }
    );
  },
};
</script>

<style></style>
