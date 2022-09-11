<template>
  <div>
    <default-button
      labelHover="actualizar datos!"
      :colorButton="'primary'"
      mdiIcon="mdi-pencil"
      @clickButton="showMenu"
      size="x-small"
    />
    <v-menu
      v-model="menu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
      :close-on-content-click="false"
    >
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="primary"
          grow
        >
          <v-tab v-if="isListData">Lista</v-tab>
          <v-tab v-else>Objeto</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-if="isListData">
            <list-form :listToEdit="dataToUpdate" />
          </v-tab-item>

          <v-tab-item v-else>
            <object-form :objectToEdit="dataToUpdate" />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import DefaultButton from "../../common/Buttons/DefaultButton.vue";
import ListForm from "../generator-form-types/ListForm.vue";
import ObjectForm from "../generator-form-types/ObjectForm.vue";

export default {
  components: {
    "default-button": DefaultButton,
    "list-form": ListForm,
    "object-form": ObjectForm,
  },
  props: {
    dataToUpdate: {
      required: true,
    },
  },
  data() {
    return { menu: false, x: 0, y: 0, tab: null };
  },
  computed: {
    isListData() {
      if (this.dataToUpdate && Object.values(this.dataToUpdate).length > 0) {
        const value = Object.values(this.dataToUpdate)[0];
        return Array.isArray(value);
      }
      return false;
    },
  },
  methods: {
    showMenu(e) {
      this.menu = false;
      const position = e.$el.getBoundingClientRect();
      this.x = position.x + position.width;
      this.y = position.y;
      this.$nextTick(() => {
        this.menu = true;
      });
    },
  },
};
</script>

<style></style>
