<template>
  <v-container class="pt-6" style="width: 100%; height: 100%">
    <v-row class="header-app">
      <v-col>
        <v-icon large left color="primary"> mdi-home-account </v-icon>
        <span class="text-h6 font-weight-light">Area Personal</span>
      </v-col>
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

<style>
.header-app {
  border-radius: 10px;
  text-align: left;
  color: #26a69a;
  font-size: 20px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 5px,
    rgba(10, 37, 64, 0.35) 0px -1px 3px inset;
}
</style>
