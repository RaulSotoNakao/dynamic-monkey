<template>
  <div>
    <default-button
      labelHover="Mostrar datos en formato json"
      :colorButton="''"
      mdiIcon="mdi-eye"
      @clickButton="() => (dialog = true)"
      size="x-small"
    />
    <v-dialog v-model="dialog" width="1000" v-if="dialog">
      <v-card class="py-1">
        <v-card-title class="text-center justify-center py-6">
          <p class="font-weight-bold">¡JSON!</p>
        </v-card-title>

        <json-form />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import JsonForm from "../generator-form-types/JsonForm.vue";
import DefaultButton from "../../common/Buttons/DefaultButton.vue";

export default {
  components: { JsonForm, "default-button": DefaultButton },
  data() {
    return { dialog: false };
  },
};
</script>

<style></style>
