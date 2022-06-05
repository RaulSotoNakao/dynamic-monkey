º
<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      floating
      app
      expand-on-hover
      color="blue-grey lighten-4"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="@/assets/monkey.png" contain></v-img>
        </v-list-item-avatar>

        <v-list-item-title
          >Bienvenido {{ userData.userName || "" }}!</v-list-item-title
        >

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in [...items, ...generatorList]"
          :key="item.name"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
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
      items: [{ name: "Area personal", icon: "mdi-account", route: { name: 'profile'}  }],
      groupItems: [
        {
          name: "Generators",
          icon: "mdi-table-cog",
          route: "generator-view",
          items: [],
        },
      ],
      mini: true,
      generatorList: [],
      userData: {},
    };
  },
  mounted() {
    window.ipc.send("USER_DATA");
    window.ipc.send("GENERATOR_LIST");

    window.ipc.on("USER_DATA", (payload) => {
      this.userData = payload.content.userData;
    });
    window.ipc.on("GENERATOR_LIST", (payload) => {
      this.generatorList = payload.content.map((generator) => ({
        route: { name: 'generator-view', params: { name: generator.definition.name }},
        icon: "mdi-table-cog",
        ...generator.definition,
      }));
    });
  },
};
</script>
