<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        ref="myButton"
        @click="clickButton"
        :disabled="disabledButton"
        text
        icon
        :color="colorButton"
        :class="customClass"
        v-bind="buttonSize"
        v-on="on"
        :key="`${buttonSize}`"
      >
        <v-icon>{{ mdiIcon }} </v-icon>
      </v-btn>
    </template>
    <span>{{ labelHover }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    labelHover: {
      type: String,
      required: true,
    },
    mdiIcon: {
      type: String,
      required: true,
    },
    customClass: {
      type: String,
      default: "",
    },
    colorButton: {
      type: String,
      default: "primary",
    },
    disabledButton: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "x-small",
    },
  },
  data() {
    return {};
  },
  computed: {
    buttonSize() {
      const size = {};
      size[this.size] = true;
      return size;
    },
  },
  methods: {
    clickButton(e) {
      e.preventDefault();
      e.stopPropagation();

      this.$emit("clickButton", this.$refs.myButton);
    },
  },
};
</script>

<style></style>
