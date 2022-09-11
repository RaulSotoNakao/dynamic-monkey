<template>
  <v-card flat>
    <v-row class="mx-2 my-2 secondary rounded-lg">
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
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    objectToEdit: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      newObjectData: { key: "", value: "" },
    };
  },
  computed: {
    ...mapGetters(["selectedGenerator"]),
  },
  watch: {
    objectToEdit: {
      handler(value) {
        if (value && Object.values(value).length > 0) {
          const keyValue = Object.entries(value)[0];
          this.newObjectData = { key: keyValue[0], value: keyValue[1] };
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
        })
        .then(() =>
          this.SHOW_MESSAGE_BOX_SUCCESS("se ha añadido el dato correctamente")
        );

      this.newObjectData.key = "";
      this.newObjectData.value = "";
    },
  },
};
</script>

<style></style>
