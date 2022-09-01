<template>
  <v-card class="" color="secondary">
    <v-card-title class="text-h6">
      Datos disponibles
      <v-dialog v-model="dialog" width="1000">
        <template v-slot:activator="{ on, attrs }">
          <v-btn x-small icon color="primary" v-bind="attrs" v-on="on">
            <v-icon> mdi-plus-box </v-icon>
          </v-btn>
        </template>
        <modal-generator></modal-generator>
      </v-dialog>
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
                <v-btn x-small icon @click="() => deleteData(key)">
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
import modalGenerator from "./modalGenerator.vue";
export default {
  components: { "modal-generator": modalGenerator },
  data: () => ({
    dialog: false,
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
    handleSelectedData(key) {
      const data = {};
      data[key] = this.selectedGenerator.templateDefinitions[key];
      this.UPDATE_SELECTED_DATA(data);
      //this will be a event
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
