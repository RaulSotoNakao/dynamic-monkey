<template>
  <div>
    <default-button
      labelHover="Borrar campo"
      :colorButton="''"
      mdiIcon="mdi-delete-forever"
      @clickButton="showMenu"
      size="x-small"
    />

    <v-menu
      v-model="isActiveMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-x
    >
      <v-card class="background">
        <v-card-actions>
          ¿Estas seguro?
          <v-btn color="primary  ml-2" @click="() => deleteItem()"
            ><span class="background--text">Si</span></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import DefaultButton from "./DefaultButton.vue";
export default {
  components: { DefaultButton },
  props: {},
  data() {
    return {
      isActiveMenu: false,
      x: 0,
      y: 0,
    };
  },
  methods: {
    deleteItem() {
      this.$emit("deleteItem");
    },
    showMenu(e) {
      this.isActiveMenu = false;
      const position = e.$el.getBoundingClientRect();
      this.x = position.x + position.width;
      this.y = position.y;
      this.$nextTick(() => {
        this.isActiveMenu = true;
      });
    },
  },
};
</script>
