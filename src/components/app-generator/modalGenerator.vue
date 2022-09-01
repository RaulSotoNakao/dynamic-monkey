<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <p class="font-weight-bold">¡A crear nuevos datos!</p>
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" color="primary" grow>
      <v-tab>Lista</v-tab>
      <v-tab>Objeto</v-tab>
      <v-tab>JSON</v-tab>
      <v-tab>MYSQL</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <list-form />
      </v-tab-item>

      <v-tab-item>
        <object-form />
      </v-tab-item>

      <v-tab-item>
        <json-form />
      </v-tab-item>
      <v-tab-item>
        <database-form-query />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import DatabaseFormQuery from "./generator-form-types/databaseFormQuery.vue";
import JsonForm from "./generator-form-types/JsonForm.vue";
import ListForm from "./generator-form-types/ListForm.vue";
import ObjectForm from "./generator-form-types/ObjectForm.vue";

export default {
  components: { ListForm, ObjectForm, JsonForm, DatabaseFormQuery },
  data() {
    return {
      tab: null,
    };
  },
};
</script>

<style></style>
