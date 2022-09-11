<template>
  <v-card flat>
    <v-row class="d-flex justify-center align-center mx-2 my-2">
      <v-col class="mx-2" cols="11">
        <v-card>
          <v-data-table
            dense
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
                <v-col cols="6">
                  <v-btn
                    class=""
                    small
                    color="primary"
                    @click="addNewTableRegistry"
                  >
                    añadir nuevo registro
                  </v-btn>
                </v-col>
              </v-row>
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:body="{ items }">
              <tr v-for="(item, id) in items" :key="id">
                <td v-for="header in newListHeaders" :key="header.value">
                  <v-text-field
                    class="ml-2 text-caption"
                    v-if="header.value !== 'actions'"
                    placeholder="Placeholder"
                    v-model="item[header.value]"
                  ></v-text-field>
                  <div v-else class="d-flex justify-center">
                    <v-icon small @click="deleteListItem(id)">
                      mdi-delete
                    </v-icon>
                  </div>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col class="mx-2" cols="6">
        <v-btn class="mx-2" small color="secondary" @click="newList">
          nueva lista
        </v-btn>

        <v-btn class="" small color="primary" @click="saveList">
          guardar lista
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    listToEdit: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      newHeader: "",
      newListHeaders: [{ text: "Acciones", value: "actions", sortable: false }],
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
          colNameFirstRow.map((colname) => {
            this.newHeader = colname;
            this.addNewHeader();

            this.newHeader = "";
          });
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
    addNewHeader() {
      if (this.newListHeaders.find((h) => h.value === this.newHeader)) {
        this.SHOW_MESSAGE_BOX_ERROR(
          "Amigo... no pueden existir 2 cabeceras iguales."
        );
        return "";
      }

      const oldHeadersWithoutActions = this.newListHeaders.filter(
        (h) => h.value !== "actions"
      );
      const actionHeader = this.newListHeaders.filter(
        (h) => h.value === "actions"
      );

      this.newListHeaders = [
        ...oldHeadersWithoutActions,
        {
          text: this.newHeader,
          align: "center",
          value: this.newHeader,
        },
        ...actionHeader,
      ];
    },
    addNewTableRegistry() {
      const newRegistrye = this.newListHeaders
        .filter((h) => h.value !== "actions")
        .map((h) => h.value);
      const newRegistry = newRegistrye.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      this.newListData.list = [...this.newListData.list, newRegistry];
    },
    saveList() {
      const newData = {};
      newData[this.newListData.key] = this.newListData.list;
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
    newList() {
      this.newListHeaders = [
        { text: "Acciones", value: "actions", sortable: false },
      ];
      this.newListData = { key: "", list: [] };
    },
    deleteListItem(key) {
      const list = this.newListData.list;
      this.newListData.list = [
        ...list.slice(0, key),
        ...list.slice(key + 1, list.length),
      ];
    },
  },
};
</script>

<style></style>
