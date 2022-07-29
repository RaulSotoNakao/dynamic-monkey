<template>
  <v-card class="" color="secondary">
    <v-card-title class="text-h6">
      Datos disponibles
      <v-menu :close-on-content-click="false" :nudge-width="200" offset-x>
        <template v-slot:activator="{ on, attrs }">
          <v-btn x-small icon color="primary" v-bind="attrs" v-on="on">
            <v-icon> mdi-plus-box </v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title>¡A crear nuevos datos!</v-card-title>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Crear nueva lista
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list-item-content>
                  <v-row class="d-flex justify-center align-center mt-1">
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
                              <td
                                v-for="header in newListHeaders"
                                :key="header.value"
                              >
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
                      <v-btn
                        class="mx-2"
                        small
                        color="secondary"
                        @click="newList"
                      >
                        nueva lista
                      </v-btn>

                      <v-btn class="" small color="primary" @click="saveList">
                        guardar lista
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Crear nuevo objeto
              </v-expansion-panel-header>
              <v-expansion-panel-content>
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
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>
                crear datos a partir de json
              </v-expansion-panel-header>
              <v-expansion-panel-content>
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
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-menu>
    </v-card-title>
    <v-row class="mx-3">
      <v-col cols="12">
        <v-chip-group active-class="primary--text" column>
          <v-chip
            outlined
            color="primary"
            v-for="(value, key) in this.selectedGenerator.templateDefinitions"
            :key="key"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  :style="`width: 10rem`"
                  v-bind="attrs"
                  v-on="on"
                  @click="() => handleSelectedData(key)"
                >
                  {{ key }}
                </v-btn>
                <v-btn
                  x-small
                  icon
                  @click="() => deleteData(key)"
                >
                  <v-icon> mdi-delete-forever </v-icon>
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    newHeader: "",
    newListHeaders: [{ text: "Acciones", value: "actions", sortable: false }],
    newObjectData: { key: "", value: "" },
    newListData: { key: "", list: [] },
    newJsonData: "",
  }),
  computed: {
    ...mapGetters(["selectedGenerator"]),
  },

  methods: {
    ...mapActions([
      "SHOW_MESSAGE_BOX_ERROR",
      "UPDATE_SELECTED_DATA",
      "UPDATE_SELECTED_GENERATOR",
    ]),
    deleteListItem(key) {
      const list = this.newListData.list;
      this.newListData.list = [
        ...list.slice(0, key),
        ...list.slice(key + 1, list.length),
      ];
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
        });
    },
    newList() {
      this.newListHeaders = [
        { text: "Acciones", value: "actions", sortable: false },
      ];
      this.newListData = { key: "", list: [] };
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
    handleSelectedData(key) {
      const data = {};
      data[key] = this.selectedGenerator.templateDefinitions[key];
      this.UPDATE_SELECTED_DATA(data);
      //this will be a event
    },
    addNewJsonData() {
      try {
        const newData = JSON.parse(this.newJsonData);
        const beforeDefinitions =
          this.selectedGenerator.templateDefinitions || {};
        const templateDefinitions = { ...beforeDefinitions, ...newData };
        window.ipc
          .UPDATE_GENERATOR({
            ...this.selectedGenerator,
            templateDefinitions,
          })
          .then(() => window.ipc.GET_GENERATOR(this.selectedGenerator.name))
          .then((payload) => {
            this.UPDATE_SELECTED_GENERATOR(payload.content);
          });
        this.newJsonData = "";
      } catch (error) {
        this.SHOW_MESSAGE_BOX_ERROR("Amigo... el formato json no es correcto.");
      }
    },
    addNewDataList() {},
    addNewObject() {
      const newData = {};
      newData[this.newObjectData.key] = this.newObjectData.value;
      const beforeDefinitions =
        this.selectedGenerator.templateDefinitions || {};
      const templateDefinitions = { ...beforeDefinitions, ...newData };

      window.ipc
        .UPDATE_GENERATOR({
          ...this.selectedGenerator,
          templateDefinitions,
        })
        .then(() => window.ipc.GET_GENERATOR(this.selectedGenerator.name))
        .then((payload) => {
          this.UPDATE_SELECTED_GENERATOR(payload.content);
        });

      this.newObjectData.key = "";
      this.newObjectData.value = "";
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
};
</script>

<style></style>
