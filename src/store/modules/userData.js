const userData = {
  state: () => ({
    userData: {
      userName: "",
      lastName: "",
      urlDirectorioDeTrabajo: "",
    },
  }),
  mutations: {
    UPDATE_USER_DATA(state, userData = {}) {
      state.userData = userData;
    },
  },
  actions: {
    UPDATE_USER_DATA(context, userData) {
      return context.commit("UPDATE_USER_DATA", userData);
    },
  },
  getters: {
    userData: (state) => state.userData,
  },
};

export default userData;
