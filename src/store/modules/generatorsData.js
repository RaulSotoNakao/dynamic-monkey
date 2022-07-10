const generatorsData = {
  state: () => ({
    generatorsData: [],
    selectedGenerator: {},
    selectedData: {},
    selectedTemplate: {},
  }),
  mutations: {
    UPDATE_GENERATORS_DATA(state, generatorsData = {}) {
      state.generatorsData = generatorsData;
    },
    UPDATE_SELECTED_GENERATOR(state, selectedGenerator = {}) {
      state.selectedGenerator = selectedGenerator;
    },
    UPDATE_SELECTED_DATA(state, selectedData) {
      state.selectedData = selectedData;
    },
    UPDATE_SELECTED_TEMPLATE(state, selectedTemplate) {
      state.selectedTemplate = selectedTemplate;
    },
  },
  actions: {
    UPDATE_GENERATORS_DATA(context, generatorsData) {
      context.commit("UPDATE_GENERATORS_DATA", generatorsData);
    },
    UPDATE_SELECTED_GENERATOR(context, selectedGenerator) {
      context.commit("UPDATE_SELECTED_GENERATOR", selectedGenerator);
    },
    UPDATE_SELECTED_DATA(context, selectedData) {
      context.commit("UPDATE_SELECTED_DATA", selectedData);
    },
    UPDATE_SELECTED_TEMPLATE(context, selectedTemplate) {
      context.commit("UPDATE_SELECTED_TEMPLATE", selectedTemplate);
    },
  },
  getters: {
    generatorsData: (state) => state.generatorsData,
    selectedGenerator: (state) => state.selectedGenerator,
    selectedData: (state) => state.selectedData,
    selectedTemplate: (state) => state.selectedTemplate,
  },
};

export default generatorsData;
