<template>
  <button class="btn d-flex align-center justify-center" @click="handleClick">
    <v-icon v-if="icon" class="icon"> {{ icon }} </v-icon>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: false,
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.btn {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: var(--v-primary-base);
}

.btn:hover {
  background-color: var(--v-secondary-base);
}

.btn:hover i {
  color: var(--v-primary-base) !important;
}

.icon {
  padding-left: 3.5px;
  color: white !important;
}
</style>
