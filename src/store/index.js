import Vue from "vue";
import Vuex from "vuex";
import userData from "./modules/userData";
import generatorsData from "./modules/generatorsData";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { userData, generatorsData },
});
