import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import es from "vuetify/lib/locale/es";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      options: { customProperties: true },
      light: {
        primary: "#14203d",
        secondary: "#cdae7c",
        text: "#FFC107",
        accent: "#EF5350",
        error: "#FF5252",
        info: "#2196F3",
        success: "#81C784",
        background: "#eae5d9",

      },
      dark: {
        primary: "#8F93A2",
        secondary: "#deb148",
        text: "#FFC107",
        accent: "#EF5350",
        error: "#FF5252",
        info: "#2196F3",
        success: "#81C784",
        background: "#263238",
      },
    },
  },
  lang: {
    locales: { es },
    current: "es",
  },
});
