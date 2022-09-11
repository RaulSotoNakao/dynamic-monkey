<template>
  <v-list dense color="secondary">
    <v-subheader class="header-container">
      <div style="width: 11rem" class="text-h6">Datos disponibles</div>
      <div class="mr-2 buttons-container">
        <modal-json-form></modal-json-form>
        <modal-generator></modal-generator>
        <menu-add-data></menu-add-data>
      </div>
    </v-subheader>
    <v-list-item-group v-model="selectedItem" color="primary">
      <v-list-item v-for="(item, i) in templateDefinitionList" :key="i">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content @click="() => handleSelectedData(item.name)">
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>

        <menu-update-data :dataToUpdate="item.value" />

        <delete-button
          @deleteItem="() => deleteData(item.name)"
        ></delete-button>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DeleteButton from "../../common/Buttons/DeleteButton.vue";
import DefaultButton from "../../common/Buttons/DefaultButton.vue";
import ModalJsonForm from "./ModalJsonForm";
import ModalGenerator from "./modalGenerator.vue";
import MenuAddData from "./MenuAddData.vue";
import MenuUpdateData from "./menuUpdateData.vue";
export default {
  components: {
    "delete-button": DeleteButton,
    "default-button": DefaultButton,
    "modal-json-form": ModalJsonForm,
    "modal-generator": ModalGenerator,
    MenuAddData,
    MenuUpdateData,
  },
  props: {},
  data: () => ({
    selectedItem: "",
    dataIcons: {
      list: "mdi-format-list-checkbox",
      Object: "mdi-middleware-outline",
    },
  }),
  computed: {
    ...mapGetters(["selectedGenerator"]),
    templateDefinitionList() {
      if (
        this.selectedGenerator &&
        this.selectedGenerator.templateDefinitions
      ) {
        const keys = Object.keys(this.selectedGenerator.templateDefinitions);
        const parsedList = keys.map((name) => {
          const isArray = Array.isArray(
            this.selectedGenerator.templateDefinitions[name]
          );

          const value = {};
          value[name] = structuredClone(this.selectedGenerator.templateDefinitions[name]);

          const dataType = isArray ? "list" : "Object";
          return { name, icon: this.dataIcons[dataType], value };
        });
        return parsedList;
      } else {
        return [];
      }
    },
  },

  methods: {
    ...mapActions([
      "UPDATE_SELECTED_TEMPLATE",
      "UPDATE_SELECTED_GENERATOR",
      "UPDATE_SELECTED_DATA",
    ]),
    showJson() {},
    handleSelectedData(key) {
      const data = {};
      data[key] = this.selectedGenerator.templateDefinitions[key];
      this.UPDATE_SELECTED_DATA(data);
    },
    deleteData(key) {
      const dataList = Object.entries(
        this.selectedGenerator.templateDefinitions
      );
      const newData = dataList.filter((data) => data[0] !== key);
      const templateDefinitions = newData.length
        ? Object.fromEntries(newData)
        : [];
      window.ipc
        .UPDATE_GENERATOR({
          ...this.selectedGenerator,
          templateDefinitions,
        })
        .then(() => window.ipc.GET_GENERATOR(this.selectedGenerator.name))
        .then((payload) => {
          this.UPDATE_SELECTED_GENERATOR(payload.content);
        });
    },
  },
  watch: {},
};
</script>

<style scoped>
.buttons-container {
  display: flex;
  justify-content: flex-end;
  width: 4rem;
}
.header-container {
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
}
</style>
