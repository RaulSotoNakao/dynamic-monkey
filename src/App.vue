º
<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      floating
      app
      color="blue-grey lighten-4"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="@/assets/monkey.png" contain></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Welcome!</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      drawer: true,
      items: [
        { title: "Generators", icon: "mdi-table-cog", route: "generator-view" },
        { title: "Preferences", icon: "mdi-account", route: "profile" },
      ],
      mini: true,
    };
  },
};
</script>
