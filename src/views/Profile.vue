<template>
  <v-container class="pt-7" style="width: 100%; height: 100%">
    <v-row style="border-bottom: 2px solid #cfd8dc; border-radius: 15px">
      <v-icon large left> mdi-home-account </v-icon>
      <span class="text-h6 font-weight-light">Area Personal</span>
    </v-row>
    <v-row>
      <v-timeline dense>
        <v-timeline-item color="primary" fill-dot>
          <template v-slot:icon>
            <v-icon color="white">mdi-account-details</v-icon>
          </template>

          <user-form-data />
        </v-timeline-item>
        <v-timeline-item color="primary" fill-dot>
          <template v-slot:icon>
            <v-icon color="white">mdi-file-tree</v-icon>
          </template>

          <generator-form></generator-form>
        </v-timeline-item>
        <v-timeline-item color="primary" fill-dot>
          <template v-slot:icon>
            <v-icon color="white">mdi-database-arrow-left </v-icon>
          </template>

          <mysql-form></mysql-form>
        </v-timeline-item>
        <v-timeline-item color="primary" fill-dot>
          <template v-slot:icon>
            <v-icon color="white">mdi-database-arrow-left </v-icon>
          </template>

          <query-manager />
        </v-timeline-item>
      </v-timeline>
    </v-row>
  </v-container>
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
