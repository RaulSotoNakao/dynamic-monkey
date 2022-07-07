<template>
  <v-card class="mx-4" color="secondary" dark>
    <v-card-title class="text-h6">
      Datos disponibles
      <v-menu :close-on-content-click="false" :nudge-width="200" offset-x>
        <template v-slot:activator="{ on, attrs }">
          <v-btn x-small icon color="primary" dark v-bind="attrs" v-on="on">
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
          <v-chip v-for="(value, key) in templateDefinitions" :key="key">
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
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    newHeader: "",
    newListHeaders: [],
    newObjectData: { key: "", value: "" },
    newListData: { key: "", list: [] },
    newJsonData: "",
    templateDefinitions: {},
    selectedData: {},
  }),
  methods: {
    ...mapActions(["SHOW_MESSAGE_BOX_ERROR"]),
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
    handleSelectedData(key) {
      const data = {};
      data[key] = this.templateDefinitions[key];
      this.selectedData = data;
      //this will be a event
    },
    addNewJsonData() {
      try {
        const newData = JSON.parse(this.newJsonData);
        this.templateDefinitions = { ...this.templateDefinitions, ...newData };
      } catch (error) {
        this.SHOW_MESSAGE_BOX_ERROR("Amigo... el formato json no es correcto.");
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
  },
};
</script>

<style></style>
