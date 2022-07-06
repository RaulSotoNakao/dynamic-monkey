<template>
  <div class="home black d-flex justify-center align-center">
    <galaxy></galaxy>
  </div>
</template>

<script>
import Galaxy from "../components/ui/Galaxy.vue";
export default {
  name: "Home",
  components: {
    galaxy: Galaxy,
  },
};
</script>
<style scoped>
.home {
  height: 100%;
  width: 100%;
}
</style>
