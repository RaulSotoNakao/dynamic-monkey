<template>
  <v-card flat>
    <v-row class="mx-2 my-2 secondary rounded-lg">
      <v-col>
        <v-textarea
          label="JSON DATA"
          append-outer-icon="mdi-plus-circle"
          v-model="newJsonData"
          @click:append-outer="addNewJsonData()"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      newJsonData: "",
    };
  },
  computed: {
    ...mapGetters(["selectedGenerator"]),
  },

  methods: {
    ...mapActions([
      "SHOW_MESSAGE_BOX_ERROR",
      "SHOW_MESSAGE_BOX_SUCCESS",
      "UPDATE_SELECTED_DATA",
      "UPDATE_SELECTED_GENERATOR",
    ]),
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
          })
          .then(() =>
            this.SHOW_MESSAGE_BOX_SUCCESS(
              "se ha añadido el dato json correctamente"
            )
          );
        this.newJsonData = "";
      } catch (error) {
        this.SHOW_MESSAGE_BOX_ERROR("Amigo... el formato json no es correcto.");
      }
    },
  },
};
</script>
