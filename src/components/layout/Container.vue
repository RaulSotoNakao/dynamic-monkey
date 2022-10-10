<template>
  <div class="my-container">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.my-container {
  width: 100%;
  height: 100%;
  border: 1px solid #cfd8dc;
  border-radius: 2px;
  transition: border-bottom 0.2s linear;
  box-shadow: #26a69a;
  border-top: 0px;
}
.my-container:hover {
  box-shadow: 0px 0px 2px #26a69a;
}

.header {
  padding: 20px;
  text-align: left;
  color: #26a69a;
  font-size: 20px;
  border-top: 2px solid #26a69a;
  border-bottom: 1px solid #cfd8dc;
}
</style>
