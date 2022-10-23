º
<template>
  <v-app>
    <system-bar />
    <!-- <side-nav /> -->
    <v-main class="mt-6" style="height: 90vh; overflow-y: scroll">
      <router-view />
    </v-main>
    <message-box></message-box>
  </v-app>
</template>

<script>
import SideNav from "./components/layout/SideNav.vue";
import MessageBox from "./components/layout/MessageBox.vue";
import SystemBar from "./components/layout/SystemBar.vue";
export default {
  name: "App",
  components: {
    "side-nav": SideNav,
    "message-box": MessageBox,
    SystemBar,
  },
};
</script>

<style>
.v-application {
  background-color: var(--v-background-base) !important;
}

.background-app {
  background-color: var(--v-background-base) !important;
}

html {
  overflow-y: hidden !important;
  border-radius: 20px;
}
/* width */
::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--v-primary-base);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--v-primary-base);
}
</style>
