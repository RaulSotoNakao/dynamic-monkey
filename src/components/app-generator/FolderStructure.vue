<template>
  <v-treeview
    :open="initiallyOpen"
    :items="templateList"
    activatable
    @update:active="activeTreeClick"
    item-key="id"
    open-all
    return-object
    open-on-click
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="!item.file">
        {{ open ? "mdi-folder-open" : "mdi-folder" }}
      </v-icon>
      <v-icon v-else>
        {{ files[item.file] }}
      </v-icon>
    </template>
    <template v-slot:append="{ item }">
      <v-menu
        v-if="!item.file"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn x-small icon color="primary" dark v-bind="attrs" v-on="on">
            <v-icon> mdi-plus-box </v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list-item-content>
            <v-row class="mx-2">
              <v-col cols="12">
                <v-chip-group active-class="primary--text" column>
                  <v-chip
                    v-for="(icon, name) in files"
                    :key="name"
                    @click="newItemType = name"
                  >
                    {{ name }}
                    <v-btn icon color="primary">
                      <v-icon> {{ icon }}</v-icon>
                    </v-btn>
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-list-item-content>
          <v-list-item-content>
            <v-row class="mx-2">
              <v-col cols="12">
                <v-text-field
                  v-model="newItemTreeView"
                  append-outer-icon="mdi-plus-circle"
                  label="Añade un nuevo elemento al directorio"
                  type="text"
                  :disabled="!newItemType"
                  @click:append-outer="addNewItem(item)"
                  :color="'primary'"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-card>
      </v-menu>
      <v-menu
        v-if="item.id !== 'base'"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn x-small icon color="white" dark v-bind="attrs" v-on="on">
            <v-icon> mdi-delete-forever </v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list-item-content class="mx-2">
            <v-list-item-subtitle>¿Estas seguro? </v-list-item-subtitle>
          </v-list-item-content>
          <v-card-actions>
            <v-btn color="blue-grey lighten-4" @click="() => deleteItem(item)"
              >Si</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-menu>
    </template>
  </v-treeview>
</template>

<script>
export default {
  props: {
    templateList: {
      type: Array,
      required: true,
    },
  },
  computed: {},
  data: () => ({
    initiallyOpen: ["base-dir"],
    files: {
      folder: "mdi-folder",
      html: "mdi-language-html5",
      js: "mdi-nodejs",
      json: "mdi-code-json",
      md: "mdi-language-markdown",
      txt: "mdi-file-document-outline",
    },
    newItemType: "",
    newItemTreeView: "",
  }),
  methods: {
    activeTreeClick(val = []) {
      if (val.length && val[0].file) {
        this.$emit("activeFile", val[0]);
      }
    },
    addNewItem(item) {
      if (this.newItemTreeView !== "") {
        const uniqId = Math.floor(Math.random() * Math.pow(10, 15));

        const itemToAdd = {
          id: `${uniqId}`,
          name: this.newItemTreeView,
        };
        if (this.newItemType === "folder") {
          itemToAdd.children = [];
        } else {
          itemToAdd.file = this.newItemType;
          itemToAdd.template = `Hello {{name}}\n\rYou have just won {{value}} dollars!\{{#in_ca}}\n\rWell, {{taxed_value}} dollars, after taxes.\n\r{{/in_ca}}
`;
        }
        this.$emit("addNewItem", { id: item.id, itemToAdd });

        this.newItemTreeView = "";
      }
    },
    deleteItem(item) {
      this.$emit("deleteItem", item.id);
    },
  },
  watch: {},
};
</script>

<style></style>
