const generatorsData = {
  state: () => ({
    generatorsData: [],
    selectedGenerator: {},
  }),
  mutations: {
    UPDATE_GENERATORS_DATA(state, generatorsData = {}) {
      state.generatorsData = generatorsData;
    },
    UPDATE_SELECTED_GENERATOR(state, selectedGenerator = {}) {
      state.selectedGenerator = selectedGenerator;
    },
  },
  actions: {
    UPDATE_GENERATORS_DATA(context, generatorsData) {
      context.commit("UPDATE_GENERATORS_DATA", generatorsData);
    },
    UPDATE_SELECTED_GENERATOR(context, selectedGenerator) {
      context.commit("UPDATE_SELECTED_GENERATOR", selectedGenerator);
    },
  },
  getters: {
    generatorsData: (state) => state.generatorsData,
    selectedGenerator: (state) => state.selectedGenerator,
  },
};

export default generatorsData;
