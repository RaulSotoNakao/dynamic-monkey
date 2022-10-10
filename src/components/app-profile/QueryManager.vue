<template>
  <c-container>
    <template v-slot:header>
      <v-row>
        <v-col :cols="12" :md="6">Gestiona tus propias queries </v-col>
        <v-col :cols="12" :md="6">
          <v-text-field
            label="Nombre query"
            v-model="newQuerieName"
            hint="cada nombre debe ser único ;)"
            prepend-icon="mdi-table-cog "
          >
            <template v-slot:append-outer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="() => saveQuerie(newQuerieName)"
                    :disabled="!newQuerieName"
                    small
                    text
                    color="primary"
                    class="ml-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-plus-box </v-icon>
                  </v-btn>
                </template>
                <span>Crear Nueva querie</span>
              </v-tooltip>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </template>
    <v-row class="mx-3">
      <v-col :xs="12">
        <v-chip-group active-class="primary--text" column>
          <v-chip
            v-for="query in userData.queries"
            :key="query.queryName"
            @click="selectedQuery = query.queryName"
          >
            <v-icon> mdi-text-box</v-icon>
            {{ query.queryName }}

            <delete-button @deleteItem="() => deleteQuery(query.queryName)" />
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col :cols="12">
        <v-textarea
          label="Query Sql"
          v-model="querySql"
          :auto-grow="true"
          :disabled="!selectedQuery"
        />
      </v-col>
    </v-row>
    <v-row class="mx-3">
      <v-col class="d-flex justify-end">
        <v-btn
          color="primary"
          :disabled="!selectedQuery"
          class="mx-2"
          @click="() => saveQuerie(selectedQuery, querySql)"
        >
          {{ selectedQuery ? `Guardar "${selectedQuery}"` : "select query" }}
          <v-icon right> mdi-content-save </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </c-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DeleteButton from "../common/Buttons/DeleteButton.vue";

export default {
  components: { DeleteButton },
  data: () => ({
    newQuerieName: "",
    selectedQuery: "",
    querySql: "",
  }),
  computed: {
    ...mapGetters(["userData"]),
    selectedQuerySql() {
      return !!this.selectedQuery
        ? this.userData.queries[this.selectedQuery]
        : "";
    },
  },
  watch: {
    selectedQuery(val) {
      this.querySql = (
        this.userData.queries.find((q) => q.queryName === val) || {}
      ).querySql;
    },
  },
  methods: {
    ...mapActions(["UPDATE_USER_DATA", "SHOW_MESSAGE_BOX_SUCCESS"]),
    saveQuerie(queryName, querySql = "") {
      const beforeData = this.userData.queries || [];
      const listWithoutNew = beforeData.filter(
        (q) => q.queryName !== queryName
      );
      window.ipc
        .SAVE_USER_DATA({
          ...this.userData,
          queries: [...listWithoutNew, { queryName, querySql }],
        })
        .then((payload) => this.UPDATE_USER_DATA(payload))
        .then(() =>
          this.SHOW_MESSAGE_BOX_SUCCESS(
            "La query se ha guardado Correctiisimamente!"
          )
        );
    },
    deleteQuery(queryName) {
      const beforeData = this.userData.queries || [];
      const listWithoutQueryToDelete = beforeData.filter(
        (q) => q.queryName !== queryName
      );
      window.ipc
        .SAVE_USER_DATA({
          ...this.userData,
          queries: [...listWithoutQueryToDelete],
        })
        .then((payload) => this.UPDATE_USER_DATA(payload))
        .then(() => this.SHOW_MESSAGE_BOX_SUCCESS("Te la has cargado"));
    },
  },
  mounted() {},
};
</script>

<style></style>
