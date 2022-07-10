<template>
  <v-treeview
    :open="initiallyOpen"
    :items="selectedGenerator.templatesList"
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
import { mapGetters, mapActions } from "vuex";

export default {
  props: {},
  computed: {
    ...mapGetters(["selectedGenerator"]),
  },
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
    ...mapActions(["UPDATE_SELECTED_TEMPLATE"]),
    activeTreeClick(val = []) {
      if (val.length && val[0].file) {
        this.UPDATE_SELECTED_TEMPLATE(val[0]);
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
          itemToAdd.template = ``;
        }
        const newTemplateList = this.recursiveAdd(
          this.selectedGenerator.templatesList,
          item.id,
          itemToAdd
        );
        window.ipc.send("UPDATE_GENERATOR", {
          ...this.selectedGenerator,
          templatesList: newTemplateList,
        });

        this.newItemTreeView = "";
      }
    },
    recursiveAdd(list, id, itemToAdd) {
      return list.map((item) => {
        if (item.id === id) {
          item.children = [itemToAdd, ...item.children];
        } else if (item.children && item.children.length) {
          item.children = this.recursiveAdd(item.children, id, itemToAdd);
        }
        return item;
      });
    },
    deleteItem(item) {
      const newTemplateList = this.recursiveRemove(
        this.selectedGenerator.templatesList,
        item.id
      );
      window.ipc.send("UPDATE_GENERATOR", {
        ...this.selectedGenerator,
        templatesList: newTemplateList,
      });
    },
    recursiveRemove(list, id) {
      return list.filter((item) => {
        if ("children" in item) {
          item.children = this.recursiveRemove(item.children, id);
        }
        return item.id !== id;
      });
    },
  },
  watch: {},
};
</script>

<style></style>
