<template>
  <v-snackbar v-model="snackbarActive" :color="messageBoxColor.background" :vertical="true">
    {{ messageData }}

    <template v-slot:action="{ attrs }">
      <v-btn
        :color="messageBoxColor.button"
        text
        v-bind="attrs"
        @click="CLOSE_MESSAGE_BOX"
      >
        cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapGetters(["isActive", "messageData", "messageBoxColor"]),
    snackbarActive: {
      get() {
        return this.isActive;
      },
      set(value) {
        this.UPDATE_MESSAGE_ACTIVE(value);
      },
    },
  },
  methods: {
    ...mapActions(["UPDATE_MESSAGE_ACTIVE", "CLOSE_MESSAGE_BOX"]),
  },
};
</script>

<style></style>
