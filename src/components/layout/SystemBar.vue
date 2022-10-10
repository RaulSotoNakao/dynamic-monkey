<template>
  <v-system-bar fixed color="secondary" style="display: flex" height="25px">
    <v-btn class="px-0 mx-0" to="/">
      <v-icon color="primary">mdi-dog</v-icon>
    </v-btn>

    <div class="draggable">
      <p class="pl-2 text--grey">Bienvenido {{ userName }}!</p>
    </div>

    <v-spacer></v-spacer>
    <v-menu open-on-hover offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">
          <v-icon color="primary">mdi-table-cog</v-icon>
        </v-btn>
      </template>

      <v-list>
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
      </v-list>
    </v-menu>

    <v-btn to="/profile">
      <v-icon color="primary">mdi-account</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <div class="draggable"></div>

    <button-system-bar
      class="mx-1"
      icon="mdi-minus"
      @click="handleWindowMinimize"
    />
    <button-system-bar
      class="mx-1"
      icon="mdi-checkbox-blank-outline"
      @click="handleWindowMaximize"
    />
    <button-system-bar
      class="mx-1"
      icon="mdi-close"
      @click="handleWindowClose"
    />
  </v-system-bar>
</template>

<script>
import ButtonSystemBar from "../ui/ButtonSystemBar.vue";
import { randomIntFromInterval } from "../../utils/utils";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { ButtonSystemBar },
  data() {
    return {
      model: {},
      navItems: [],
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
    handleWindowClose() {
      window.ipc.CLOSE_WINDOW().then((res) => console.log(res));
    },
    handleWindowMinimize() {
      window.ipc.MINIMIZE_WINDOW().then((res) => console.log(res));
    },
    handleWindowMaximize() {
      window.ipc.MAXIMIZE_WINDOW().then((res) => console.log(res));
    },
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

<style>
.draggable {
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
}
.selector-generator {
  position: relative;
  top: 25px;
  width: 800px;
  height: 35px;
  border-radius: 20px;
  background-color: #cfd8dc;
}
</style>
