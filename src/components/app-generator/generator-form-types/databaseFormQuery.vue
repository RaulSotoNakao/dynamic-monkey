<template>
  <v-card flat>
    <v-row class="mx-2 my-2 secondary rounded-lg">
      <v-col cols="12" :sm="6" :md="3">
        <v-text-field label="host" v-model="mysql.host" />
      </v-col>
      <v-col cols="12" :sm="6" :md="3">
        <v-text-field label="user" v-model="mysql.user" />
      </v-col>
      <v-col cols="12" :sm="6" :md="3">
        <v-text-field label="password" v-model="mysql.password" />
      </v-col>
      <v-col cols="12" :sm="6" :md="3">
        <v-text-field label="database" v-model="mysql.database" />
      </v-col>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="userData.queries"
          label="Select a query saved"
          clearable
          :item-text="(e) => e.queryName"
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row class="mx-2 my-2 secondary rounded-lg">
      <v-col>
        <v-textarea
          label="Query"
          append-outer-icon="mdi-plus-circle"
          v-model="queryToExecute"
          @click:append-outer="makeQuery()"
        ></v-textarea>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MysqlForm from "../../app-profile/MysqlForm.vue";

export default {
  components: { MysqlForm },
  data() {
    return {
      mysql: {
        host: "",
        user: "",
        password: "",
        database: "",
      },
      queryToExecute: "",
      select: "",
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },

  methods: {
    ...mapActions([
      "SHOW_MESSAGE_BOX_ERROR",
      "SHOW_MESSAGE_BOX_SUCCESS",
      "UPDATE_SELECTED_DATA",
      "UPDATE_SELECTED_GENERATOR",
    ]),
    makeQuery() {
      window.ipc
        .EXECUTE_MYSQL_QUERY({
          query: this.queryToExecute,
          dbConnection: this.mysql,
        })
        .then((res) => {
          console.log(res);
        })
        .then(() => this.SHOW_MESSAGE_BOX_SUCCESS("Query ejecutada"))
        .catch((err) => {
          console.log(err);
          const errorMessage = `Amigo... La query ha fallado \n\r ${err}`;
          this.SHOW_MESSAGE_BOX_ERROR(errorMessage);
        })
        .finally(() => {});
    },
  },
  mounted() {
    if (this.userData.mysql) {
      this.mysql = this.userData.mysql || {};
    }
  },
};
</script>
