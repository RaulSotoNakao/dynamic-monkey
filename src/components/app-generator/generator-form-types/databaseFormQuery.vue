<template>
  <v-card flat>
    <c-container class="mt-5" :activeHeader="false">
      <v-row class="mx-2 my-2">
        <v-col cols="12" :sm="6" :md="4">
          <v-text-field label="host" v-model="mysql.host" />
        </v-col>
        <v-col cols="12" :sm="6" :md="4">
          <v-text-field label="port" v-model="mysql.port" />
        </v-col>
        <v-col cols="12" :sm="6" :md="4">
          <v-text-field label="database" v-model="mysql.database" />
        </v-col>
        <v-col cols="12" :sm="6">
          <v-text-field label="user" v-model="mysql.user" />
        </v-col>
        <v-col cols="12" :sm="6">
          <v-text-field label="password" v-model="mysql.password" />
        </v-col>
        <v-col cols="12">
          <v-combobox
            v-model="select"
            :items="userData.queries"
            label="Select a query saved"
            clearable
            :item-text="(e) => e.queryName"
            @change="(list) => list && setQuery(list.querySql)"
          ></v-combobox>
        </v-col>
      </v-row>
    </c-container>
    <c-container  class="mt-5" :activeHeader="false">
      <v-row class="mx-2 my-2">
        <v-col>
          <v-textarea
            label="Query"
            append-outer-icon="mdi-plus-circle"
            v-model="queryToExecute"
            @click:append-outer="makeQuery()"
          ></v-textarea>
        </v-col>
      </v-row>
    </c-container>
    <c-container  class="mt-5" :activeHeader="false">
      <v-row class="mx-2 my-2">
        <v-col cols="12">
          <v-text-field
            :label="'nombre de la query'"
            v-model="newListData.key"
            type="text"
            :required="true"
            :color="'primary'"
          ></v-text-field>
        </v-col>

        <v-col>
          <editable-table
            :columnDefs="columnDef"
            :rowData.sync="newListData.list"
            @saveTable="saveData"
            :saveDisabled="!newListData.key"
          ></editable-table>
        </v-col>
      </v-row>
    </c-container>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MysqlForm from "../../app-profile/MysqlForm.vue";
import EditableTable from "../../layout/EditableTable.vue";
export default {
  components: { MysqlForm, "editable-table": EditableTable },
  data() {
    return {
      mysql: {
        host: "",
        user: "",
        password: "",
        database: "",
        port: "",
      },
      queryToExecute: "",
      select: "",
      columnDef: [],
      newListData: { key: "", list: [] },
    };
  },
  computed: {
    ...mapGetters(["userData", "selectedGenerator"]),
  },
  beforeMount() {},
  methods: {
    ...mapActions([
      "SHOW_MESSAGE_BOX_ERROR",
      "SHOW_MESSAGE_BOX_SUCCESS",
      "UPDATE_SELECTED_DATA",
      "UPDATE_SELECTED_GENERATOR",
    ]),
    setQuery(val) {
      this.queryToExecute = val;
    },
    saveData(val) {
      const newData = {};
      newData[this.newListData.key] = val;
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
        .then(() => {
          this.SHOW_MESSAGE_BOX_SUCCESS("Lista guardada!");
        });
    },
    makeQuery() {
      window.ipc
        .EXECUTE_MYSQL_QUERY({
          query: this.queryToExecute,
          dbConnection: this.mysql,
        })
        .then((res) => {
          if (res.length) {
            this.columnDef = Object.keys(res[0]).map((key) => ({ field: key }));
            this.newListData.list = res;
          } else {
            throw new Error("¡NO HAY DATOS!");
          }
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
