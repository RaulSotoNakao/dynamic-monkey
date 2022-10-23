<template>
  <div class="my-container">
    <div class="header" v-if="activeHeader">
      <slot name="header"></slot>
    </div>
    <div class="my-2 container-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeHeader: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style>
.my-container {
  width: 100%;
  height: 100%;
  border: 1px solid var(--v-secondary-base);
  border-bottom: 3px solid var(--v-secondary-base);

  border-radius: 11px;
  transition: transform 0.2s linear;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 10px,
    rgba(10, 37, 64, 0.35) 0px -2px 5px inset;
}
.my-container:hover {
  transform: translateY(-5px);
  box-shadow: var(--v-secondary-base) 0px 5px 10px,
    rgba(10, 37, 64, 0.35) 0px -2px 5px inset;
}

.header {
  padding: 10px;
  text-align: left;
  color: var(--v-primary-base);
  font-size: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 3px solid var(--v-secondary-base);
  border-top: 3px solid var(--v-secondary-base);
}

.container-body {
}
</style>
