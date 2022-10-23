<template>
  <div>
    <default-button
      labelHover="Añadir datos!"
      :colorButton="'primary'"
      mdiIcon="mdi-plus-box"
      @clickButton="showMenu"
      size="x-small"
    />
    <v-menu
      v-model="menu"
      :position-x="x"
      :position-y="y"
      class="background-app"
      absolute
      offset-y
      :close-on-content-click="false"
    >
      <v-card>
        <v-tabs v-model="tab" color="primary" grow>
          <v-tab class="background-app" >Lista</v-tab>
          <v-tab class="background-app" >Objeto</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="background-app">
          <v-tab-item>
            <list-form class="background-app" />
          </v-tab-item>

          <v-tab-item>
            <object-form class="background-app"  />
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
  data() {
    return { menu: false, x: 0, y: 0, tab: null };
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
