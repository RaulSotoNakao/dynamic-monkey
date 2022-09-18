<template>
  <v-snackbar
    v-model="snackbarActive"
    outlined
    :color="messageBoxColor.background"
    :vertical="true"
    timeout="4000"
  >
    {{ messageData }}

    <template v-slot:action="{ attrs }">
      <v-btn
        :color="messageBoxColor.button"
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
