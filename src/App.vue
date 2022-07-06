º
<template>
  <v-app>
    <side-nav />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import SideNav from "./components/layout/SideNav.vue";
export default {
  name: "App",
  components: {
    "side-nav": SideNav,
  },
};
</script>
