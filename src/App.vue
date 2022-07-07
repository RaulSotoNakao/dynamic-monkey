º
<template>
  <v-app>
    <side-nav />
    <v-main>
      <router-view />
    </v-main>
    <message-box></message-box>
  </v-app>
</template>

<script>
import SideNav from "./components/layout/SideNav.vue";
import MessageBox from "./components/layout/MessageBox.vue";
export default {
  name: "App",
  components: {
    "side-nav": SideNav,
    "message-box": MessageBox,
  },
};
</script>
