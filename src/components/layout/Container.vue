<template>
  <div class="my-container">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="my-2 container-body">
      <slot></slot>
    </div>
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
  border-radius: 11px;
  transition: transform 0.2s linear;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 10px,
    rgba(10, 37, 64, 0.35) 0px -2px 5px inset;
}
.my-container:hover {
  transform: translateY(-5px);
  box-shadow: #26a69a 0px 5px 10px, rgba(10, 37, 64, 0.35) 0px -2px 5px inset;

  /* box-shadow: inset 0px 10px 20px 2px #26a69a; */
}

.header {
  padding: 10px;
  text-align: left;
  color: #26a69a;
  font-size: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 2px solid #cfd8dc;
  border-top: 6px solid #cfd8dc;
}

.container-body {
}
</style>
