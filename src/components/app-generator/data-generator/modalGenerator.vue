<template>
  <div>
    <default-button
      labelHover="Añadir datos desde una bdd"
      :colorButton="''"
      mdiIcon="mdi-database-search"
      @clickButton="() => (dialog = true)"
      size="x-small"
    />
    <v-dialog v-model="dialog" width="1000" v-if="dialog">
      <v-card class="background-app">
        <v-card-title class="text-center justify-center py-6">
          <p class="font-weight-bold">¡A buscar nuevos datos!</p>
        </v-card-title>

        <v-tabs
          v-model="tab"
          color="primary"
          grow
        >
          <v-tab class="background-app">MYSQL</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="background-app">
          <v-tab-item>
            <database-form-query class="background-app"/>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DatabaseFormQuery from "../generator-form-types/databaseFormQuery.vue";
import DefaultButton from "../../common/Buttons/DefaultButton.vue";

export default {
  components: {
    DatabaseFormQuery,
    "default-button": DefaultButton,
  },
  data() {
    return {
      tab: null,
      dialog: false,
    };
  },
};
</script>

<style></style>
