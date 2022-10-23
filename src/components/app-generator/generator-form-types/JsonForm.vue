<template>
  <v-row class="mx-2 my-2 background rounded-lg">
    <v-col :cols="12">
      <v-textarea label="JSON DATA" v-model="newJsonData" :auto-grow="true" />
    </v-col>
    <v-col :cols="12">
      <v-row align="start" justify="end" class="ma-1">
        <v-btn @click="addNewJsonData" color="primary"> guardar json </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    parentData: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      newJsonData: "",
    };
  },
  computed: {
    ...mapGetters(["selectedGenerator"]),
  },
  mounted() {
    this.newJsonData = JSON.stringify(
      this.selectedGenerator.templateDefinitions,
      null,
      4
    );
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
        const templateDefinitions = { ...newData };
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
      } catch (error) {
        this.SHOW_MESSAGE_BOX_ERROR("Amigo... el formato json no es correcto.");
      }
    },
  },
};
</script>
