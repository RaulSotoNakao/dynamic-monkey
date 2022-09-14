<template>
  <v-card class="mx-auto py-2" style="width: 100%">
    <v-card-title>
      <v-icon large left> mdi-home-account </v-icon>
      <span class="text-h6 font-weight-light">Area Personal</span>
    </v-card-title>

    <v-timeline dense>
      <v-timeline-item color="secondary" fill-dot>
        <template v-slot:icon>
          <v-icon>mdi-account-details</v-icon>
        </template>

        <user-form-data />
      </v-timeline-item>
      <v-timeline-item color="secondary" fill-dot>
        <template v-slot:icon>
          <v-icon>mdi-file-tree</v-icon>
        </template>

        <generator-form></generator-form>
      </v-timeline-item>
      <v-timeline-item color="secondary" fill-dot>
        <template v-slot:icon>
          <v-icon>mdi-database-arrow-left </v-icon>
        </template>

        <mysql-form></mysql-form>
      </v-timeline-item>
      <v-timeline-item color="secondary" fill-dot >
        <template v-slot:icon>
          <v-icon>mdi-database-arrow-left </v-icon>
        </template>

        <query-manager />
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>

<script>
import GeneratorForm from "../components/app-profile/GeneratorForm.vue";
import MysqlForm from "../components/app-profile/MysqlForm.vue";
import QueryManager from "../components/app-profile/QueryManager.vue";
import UserFormData from "../components/app-profile/UserFormData.vue";

export default {
  components: {
    "user-form-data": UserFormData,
    "generator-form": GeneratorForm,
    "mysql-form": MysqlForm,
    QueryManager,
  },
  data: () => ({}),
  computed: {},
  methods: {},
  mounted() {},
};
</script>

<style></style>
