<template>
  <v-navigation-drawer
    v-model="isCollapsed"
    :mini-variant.sync="mini"
    expand-on-hover
    color="blue-grey lighten-4"
  >
    <!-- WELCOME  -->
    <v-list-item class="px-2" to="/">
      <v-list-item-avatar>
        <v-icon color="primary">mdi-dog</v-icon>
      </v-list-item-avatar>

      <v-list-item-title>Bienvenido{{ userName }}!</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>
    <!-- ______________________________________________  -->

    <v-list dense>
      <!-- NAVITEMS  -->

      <v-list-item
        v-for="item in navItems"
        :key="item.name"
        link
        :to="item.route"
        color="primary"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- GENERATOR TITLE  -->

      <v-subheader>
        <v-list-item-avatar>
          <v-icon color="secondary">mdi-table-cog</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>Generadores</v-list-item-title>
      </v-subheader>
      <!-- GENERATOR LIST -->

      <v-list-item
        v-for="item in generatorList"
        :key="item.name"
        link
        :to="item.route"
        color="primary"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- ______________________________________________  -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { randomIntFromInterval } from "../../utils/utils";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isCollapsed: true,
      navItems: [
        {
          name: "Area personal",
          icon: "mdi-account",
          route: { name: "profile" },
        },
      ],
      mini: true,
      icons: [
        "mdi-shield-bug",
        "mdi-shield-car",
        "mdi-shield-check",
        "mdi-shield-edit",
        "mdi-shield-half",
        "mdi-shield-half-full",
        "mdi-shield-home",
        "mdi-shield-key",
        "mdi-shield-link-variant",
        "mdi-shield-lock",
        "mdi-shield-off",
        "mdi-shield-plus",
        "mdi-shield-remove",
        "mdi-shield-search",
        "mdi-shield-star",
        "mdi-shield-sun",
        "mdi-shield-sync",
      ],
    };
  },
  methods: {
    ...mapActions(["UPDATE_USER_DATA", "UPDATE_GENERATORS_DATA"]),
  },
  computed: {
    ...mapGetters(["userData", "generatorsData"]),
    userName() {
      return this.userData && this.userData.userName
        ? ` ${this.userData.userName}`
        : "";
    },
    generatorList() {
      return this.generatorsData.map((generator) => ({
        route: {
          name: "generator-view",
          params: { name: generator.definition.name },
        },
        icon: this.icons[randomIntFromInterval(0, this.icons.length - 1)],
        ...generator.definition,
      }));
    },
  },
  mounted() {
    window.ipc.GET_USER_DATA().then((payload) => {
      this.UPDATE_USER_DATA(payload);
    });

    window.ipc.GENERATOR_LIST().then((payload) => {
      this.UPDATE_GENERATORS_DATA(payload);
    });
  },
};
</script>
