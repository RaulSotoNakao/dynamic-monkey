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
    <v-row class="mx-2 my-2 secondary rounded-lg">
      <v-col>
        <ag-grid-vue
          :style="`height: ${(rowData.length || 1) * 60}px`"
          class="ag-theme-alpine"
          :columnDefs="columnDefs"
          :rowData="rowData"
          :defaultColDef="defaultColDef"
                          :rowDragManaged="true"
                :suppressMoveWhenRowDragging="true"
                :animateRows="true"

        ></ag-grid-vue>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MysqlForm from "../../app-profile/MysqlForm.vue";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";

export default {
  components: { MysqlForm, AgGridVue },
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
      columnDefs: null,
      rowData: null,
      defaultColDef: {
        editable: true,
        resizable: true,
      },
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  beforeMount() {
    this.columnDefs = [
      { rowDrag: true, field: "make" },
      { field: "model" },
      { field: "price" },
    ];

    this.rowData = [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxster", price: 72000 },
    ];
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
<style>
.ag-theme-alpine {
  --ag-foreground-color: rgba(0, 0, 0, 0.6);
  --ag-background-color: #cfd8dc;
  --ag-header-foreground-color: rgba(0, 0, 0, 0.6);
  --ag-header-background-color: #cfd8dc;
  --ag-odd-row-background-color: rgb(0, 0, 0, 0.03);
  --ag-header-column-resize-handle-color: rgba(0, 0, 0, 0.6);

  --ag-font-size: 14px;
  --ag-font-family: Roboto, sans-serif;
  --ag-header-cell-hover-background-color: #26a69a;
  --ag-header-cell-moving-background-color: #cfd8dc;
}
.ag-theme-alpine .ag-header {
  font-family: Roboto, sans-serif;
}
.ag-theme-alpine .ag-header-group-cell {
  font-weight: normal;
  font-size: 15px;
}
.ag-theme-alpine .ag-header-cell {
  font-size: 15px;
}
</style>
