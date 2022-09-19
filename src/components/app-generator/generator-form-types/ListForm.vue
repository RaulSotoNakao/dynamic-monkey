<template>
  <v-card flat>
    <v-row class="mx-2 my-2 secondary rounded-lg">
      <v-col cols="12">
        <v-text-field
          :label="'nombre de la query'"
          v-model="newListData.key"
          type="text"
          :color="'primary'"
        ></v-text-field>
      </v-col>

      <v-col>
        <editable-table
          :columnDefs="newListHeaders"
          :rowData.sync="newListData.list"
          @saveTable="saveList"
          :saveDisabled="!newListData.key"
        ></editable-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EditableTable from "../../layout/EditableTable.vue";

export default {
  components: {
    "editable-table": EditableTable,
  },
  props: {
    listToEdit: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      newListHeaders: [],
      newListData: { key: "", list: [] },
    };
  },
  computed: {
    ...mapGetters(["selectedGenerator"]),
  },
  watch: {
    listToEdit: {
      handler(value) {
        if (value && Object.values(value).length > 0) {
          const keyValue = Object.entries(value)[0];
          const colNameFirstRow = Object.keys(keyValue[1][0]);

          this.newListData.key = keyValue[0];
          this.newListData.list = keyValue[1];

          this.newListHeaders = colNameFirstRow.map((column) => ({
            field: column,
          }));
        }
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    ...mapActions([
      "SHOW_MESSAGE_BOX_ERROR",
      "SHOW_MESSAGE_BOX_SUCCESS",
      "UPDATE_SELECTED_DATA",
      "UPDATE_SELECTED_GENERATOR",
    ]),
    saveList(list) {
      const newData = {};
      newData[this.newListData.key] = list;
      const beforeDefinitions =
        this.selectedGenerator.templateDefinitions || {};
      const templateDefinitions = { ...beforeDefinitions, ...newData };

      window.ipc
        .UPDATE_GENERATOR({
          ...this.selectedGenerator,
          templateDefinitions,
        })
        .then(() => this.newList())
        .then(() => window.ipc.GET_GENERATOR(this.selectedGenerator.name))
        .then((payload) => {
          this.UPDATE_SELECTED_GENERATOR(payload.content);
        })
        .then(() => {
          this.SHOW_MESSAGE_BOX_SUCCESS("Lista guardada!");
        });
    },
  },
};
</script>

<style></style>
