<template>
  <v-row>
    <v-col cols="12">
      <v-card color="grey lighten-4" flat tile elevation="4">
        <v-toolbar elevation="4" outlined rounded color="background">
          <default-button
            labelHover="Añadir fila"
            :colorButton="'primary'"
            mdiIcon="mdi-plus-box"
            @clickButton="addNewRow"
            size="large"
          />
          <div class="vl"></div>
          <v-toolbar-title>
            <v-text-field
              class="mt-5"
              append-outer-icon="mdi-plus-circle"
              label="añadir nueva cabecera"
              type="text"
              v-model="newHeader"
              @click:append-outer="addNewHeader()"
              :color="'primary'"
            ></v-text-field>
          </v-toolbar-title>
          <div class="vl"></div>

          <default-button
            labelHover="Recuperar filas y columnas eliminadas"
            :colorButton="'primary'"
            mdiIcon="mdi-lock-reset"
            @clickButton="resetHandler"
            size="large"
          />
          <div class="vl"></div>
          <default-button
            labelHover="Guardar Tabla"
            :colorButton="'primary'"
            mdiIcon="mdi-content-save-outline"
            @clickButton="saveHandler"
            :disabledButton="saveDisabled"
            size="large"
          />
          <div class="vl"></div>
          <default-button
            labelHover="Ajustar columnas"
            :colorButton="'primary'"
            mdiIcon="mdi-image-size-select-small"
            @clickButton="autoSizeAll"
            size="small"
          />
          <div class="vl"></div>

          <v-spacer></v-spacer>

          <div
            class="bin"
            style="
              height: 100%;
              width: 20rem;
              border: solid 1px;
              border-style: dashed;
              border: 2px solid var(--v-secondary-base);
              border-radius: 5px;
            "
          >
            <div ref="eBinIcon" class="text-center mt-3">
              <v-icon right> mdi-trash-can-outline </v-icon> Drop zone
            </div>
          </div>
        </v-toolbar>
        <ag-grid-vue
          :style="`height: ${calculateHeight}`"
          class="ag-theme-alpine"
          :columnDefs="customColumDef"
          :rowData="internalRowData"
          :defaultColDef="defaultColDef"
          :rowDragManaged="true"
          :rowDragEntireRow="true"
          :animateRows="true"
          @grid-ready="onGridReady"
        ></ag-grid-vue>
      </v-card>
    </v-col>
    <v-col cols="12"> </v-col>
  </v-row>
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import DefaultButton from "../common/Buttons/DefaultButton.vue";
import { mapActions } from "vuex";
export default {
  components: { "ag-grid-vue": AgGridVue, "default-button": DefaultButton },

  props: {
    rowData: {
      type: Array,
      default: () => [],
    },
    columnDefs: {
      type: Array,
      default: () => [],
    },
    saveDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      gridApi: null,
      gridColumnApi: null,
      defaultColDef: {
        editable: true,
        resizable: true,
      },
      newHeader: "",
      firstRowData: [],
      internalRowData: [],
      internalColumDef: [],
    };
  },
  methods: {
    ...mapActions(["SHOW_MESSAGE_BOX_ERROR", "SHOW_MESSAGE_BOX_SUCCESS"]),
    addNewHeader() {
      if (this.customColumDef.find((h) => h.field === this.newHeader)) {
        this.SHOW_MESSAGE_BOX_ERROR(
          "Amigo... no pueden existir 2 cabeceras iguales."
        );
        return "";
      }

      this.internalColumDef = [
        ...this.internalColumDef,
        { field: this.newHeader, headerName: this.newHeader },
      ];
    },
    addNewRow() {
      const headers = this.columnDefs.map((h) => h.field);
      const newRegistry = headers.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      this.internalRowData = [...this.internalRowData, { ...newRegistry }];
    },
    resetHandler() {
      this.gridColumnApi.resetColumnState();

      this.gridApi.setRowData(this.rowData);
      this.internalRowData = this.rowData;
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.addBinZone(params.api);
    },
    autoSizeAll() {
      const allColumnIds = [];
      this.gridColumnApi.getColumns().forEach((column) => {
        allColumnIds.push(column.getId());
      });
      this.gridColumnApi.autoSizeColumns(allColumnIds, false);
    },

    saveHandler() {
      const columnState = this.gridColumnApi.getColumnState();
      const keyOrder = columnState.filter((c) => !c.hide).map((c) => c.colId);
      let listParsed = [];
      this.gridApi.forEachNode((rowNode, index) => {
        const beforeData = rowNode.data;
        const definitiveData = {};

        keyOrder.map((key) => {
          definitiveData[key] = beforeData[key];
        });
        listParsed = [...listParsed, { ...definitiveData }];
      });
      this.$emit("saveTable", listParsed);
    },
    addBinZone(api) {
      const dropZone = {
        getContainer: () => this.$refs.eBinIcon,
        onDragEnter: () => {},
        onDragLeave: () => {},
        onDragStop: (params) => {
          this.binDrop(params.node);
        },
      };

      api.addRowDropZone(dropZone);
    },
    binDrop(node) {
      const data = node.data;

      var transaction = {
        remove: [data],
      };

      [this.gridApi].forEach((api) => {
        var rowsInGrid = !!api.getRowNode(node.id);

        if (rowsInGrid) {
          api.applyTransaction(transaction);
        }
      });
    },
  },
  computed: {
    calculateHeight() {
      if (this.internalRowData.length < 2) {
        return "8rem";
      }

      return this.internalRowData.length * 42 + 65 + "px";
    },
    customColumDef() {
      const parsedColumnDef = this.columnDefs.map((def) => {
        return { ...def, headerName: def.field };
      });

      return [...parsedColumnDef, ...this.internalColumDef];
    },
  },
  mounted() {
    this.internalRowData = this.rowData;
  },
  watch: {
    rowData: {
      handler(val) {
        this.internalRowData = val;
      },
      deep: true,
    },
  },
};
</script>

<style>
.ag-theme-alpine {
  --ag-foreground-color: rgba(0, 0, 0, 0.6);
  --ag-background-color: var(--v-background-base);
  --ag-header-foreground-color: rgba(0, 0, 0, 0.6);
  --ag-header-background-color: var(--v-background-base);
  --ag-odd-row-background-color: rgb(0, 0, 0, 0.03);
  --ag-header-column-resize-handle-color: rgba(0, 0, 0, 0.6);

  --ag-font-size: 10px;
  --ag-font-family: Roboto, sans-serif;
  --ag-header-cell-hover-background-color: var(--v-secondary-base);
  --ag-header-cell-moving-background-color: var(--v-background-base);
}
.ag-theme-alpine .ag-header {
  font-family: Roboto, sans-serif;
}
.ag-theme-alpine .ag-header-group-cell {
  font-weight: normal;
  font-size: 10px;
}
.ag-theme-alpine .ag-header-cell {
  font-size: 10px;
}
.vl {
  border-left: 2px solid var(--v-secondary-base);
  height: 100%;
  margin: 1px 1rem;
}
</style>
