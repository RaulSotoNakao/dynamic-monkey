<template>
  <v-card class="mr-10" color="secondary">
    <v-card-title class="text-h6">
      <v-row>
        <v-col>Generadores </v-col>
        <v-col>
          <v-text-field
            label="nombre"
            :disabled="!existUrlDir"
            v-model="newGeneratorName"
            hint="cada nombre debe ser único ;)"
            prepend-icon="mdi-table-cog "
          >
            <template v-slot:append-outer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="createNewGenerator"
                    :disabled="!newGeneratorName"
                    small
                    text
                    color="primary"
                    class="ml-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-plus-box </v-icon>
                  </v-btn>
                </template>
                <span>Crear nuevo generador</span>
              </v-tooltip>
              <!-- <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="() => {}"
                            small
                            text
                            color="primary"
                            class="ml-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-import</v-icon>
                          </v-btn>
                        </template>
                        <span>Importar snippet</span>
                      </v-tooltip> -->
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="subtitle-2 font-weight-bold">
      Bienvenido, ¡Aquí puedes administrar y crear Generadores!
    </v-card-text>

    <v-row class="d-flex justify-center align-center mb-6">
      <v-col class="mx-4">
        <v-card>
          <v-data-table
            class="secondary"
            :headers="generatorHeaders"
            :items="generatorList"
          >
            <!-- eslint-disable-next-line -->
            <template v-slot:item.name="{ item }">
              <v-text-field
                placeholder="Placeholder"
                v-model="item.name"
              ></v-text-field>
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:item.dirToCreateStructure="{ item }">
              <v-text-field
                placeholder="Placeholder"
                v-model="item.dirToCreateStructure"
              ></v-text-field>
            </template>

            <!-- eslint-disable-next-line -->
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="updateGenerator(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteGenerator(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    newGeneratorName: "",
    generatorHeaders: [
      {
        text: "Nombre",
        align: "start",
        sortable: true,
        value: "name",
      },
      {
        text: "Dir To Create Structure",
        align: "start",
        sortable: true,
        value: "dirToCreateStructure",
      },

      { text: "Acciones", value: "actions", align: "end", sortable: false },
    ],
  }),
  computed: {
    ...mapGetters(["userData", "generatorsData"]),
    existUrlDir() {
      return !!this.userData.urlDirectorioDeTrabajo;
    },
    generatorList() {
      return this.generatorsData.map((generator) => generator.definition);
    },
  },
  methods: {
    ...mapActions([
      "SHOW_MESSAGE_BOX_ERROR",
      "UPDATE_GENERATORS_DATA",
      "SHOW_MESSAGE_BOX_SUCCESS",
    ]),
    isValidName(name) {
      if (this.generatorList.find((s) => s.name === name)) {
        this.SHOW_MESSAGE_BOX_ERROR("Amigo... no se puede repetir el nombre.");

        return false;
      } else {
        return true;
      }
    },
    updateGenerator(item) {
      if (this.generatorList.filter((s) => s.name === item.name).length > 1) {
        this.SHOW_MESSAGE_BOX_ERROR(
          "Amigo... ¡Ya existe uno que se llama así!."
        );
      } else {
        window.ipc
          .UPDATE_GENERATOR(item)
          .then(() =>
            this.SHOW_MESSAGE_BOX_SUCCESS(
              "El generador se ha acuatlizado con exito"
            )
          );
      }
    },
    deleteGenerator(item) {
      window.ipc
        .DELETE_GENERATOR(item.id)
        .then((payload) => {
          this.UPDATE_GENERATORS_DATA(payload);
        })
        .then(() =>
          this.SHOW_MESSAGE_BOX_SUCCESS("El generador se ha borrado con exito")
        );
    },
    createNewGenerator() {
      if (this.isValidName(this.newGeneratorName)) {
        window.ipc
          .ADD_GENERATOR({
            id: new Date().valueOf(),
            name: this.newGeneratorName,
            dirToCreateStructure: "",
            categories: [],
            templatesList: [
              {
                id: "base",
                name: "base-dir",
                children: [],
              },
            ],
            templateDefinitions: {},
          })
          .then((payload) => {
            this.UPDATE_GENERATORS_DATA(payload);
          })
          .then(() =>
            this.SHOW_MESSAGE_BOX_SUCCESS("Se ha creado el generador con exito")
          );
      }
    },
  },
};
</script>

<style></style>
