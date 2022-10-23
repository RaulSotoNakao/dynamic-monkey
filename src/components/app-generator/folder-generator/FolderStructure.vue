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
          <v-btn x-small icon color="primary" v-bind="attrs" v-on="on">
            <v-icon> mdi-plus-box </v-icon>
          </v-btn>
        </template>

        <v-card class="background">
          <v-list-item-content>
            <v-row class="mx-2">
              <v-col cols="12">
                <v-chip-group active-class="secondary--text" column>
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
      <delete-button
        v-if="item.id !== 'base'"
        @deleteItem="() => deleteItem(item)"
      ></delete-button>
    </template>
  </v-treeview>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DeleteButton from "../../common/Buttons/DeleteButton.vue";

export default {
  props: {},
  components: {
    "delete-button": DeleteButton,
  },
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
    ...mapActions(["UPDATE_SELECTED_TEMPLATE", "UPDATE_SELECTED_GENERATOR"]),
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

        window.ipc
          .UPDATE_GENERATOR({
            ...this.selectedGenerator,
            templatesList: newTemplateList,
          })
          .then(() => window.ipc.GET_GENERATOR(this.selectedGenerator.name))
          .then((payload) => {
            this.UPDATE_SELECTED_GENERATOR(payload.content);
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
      window.ipc
        .UPDATE_GENERATOR({
          ...this.selectedGenerator,
          templatesList: newTemplateList,
        })
        .then(() => window.ipc.GET_GENERATOR(this.selectedGenerator.name))
        .then((payload) => {
          this.UPDATE_SELECTED_GENERATOR(payload.content);
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
