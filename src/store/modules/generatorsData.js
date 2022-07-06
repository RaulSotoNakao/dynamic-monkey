const generatorsData = {
  state: () => ({
    generatorsData: [],
  }),
  mutations: {
    UPDATE_GENERATORS_DATA(state, generatorsData = {}) {
      state.generatorsData = generatorsData;
    },
  },
  actions: {
    UPDATE_GENERATORS_DATA(context, generatorsData) {
      context.commit("UPDATE_GENERATORS_DATA", generatorsData);
    },
  },
  getters: {
    generatorsData: (state) => state.generatorsData,
  },
};

export default generatorsData;
