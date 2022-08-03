const messageData = {
  state: () => ({
    messageData: "",
    messageBoxColor: {
      background: "primary",
      button: "secondary",
    },
    isActive: false,
  }),
  mutations: {
    UPDATE_MESSAGE_DATA(state, messageData = {}) {
      state.messageData = messageData;
    },
    UPDATE_MESSAGE_ACTIVE(state, value) {
      state.isActive = value;
    },
    SHOW_MESSAGE_BOX_ERROR(state, text) {
      state.messageData = text;
      state.isActive = true;
      state.messageBoxColor.background = "primary";
      state.messageBoxColor.button = "error";
    },
    SHOW_MESSAGE_BOX_SUCCESS(state, text) {
      state.messageData = text;
      state.isActive = true;
      state.messageBoxColor.background = "primary";
      state.messageBoxColor.button = "success";
    },
    CLOSE_MESSAGE_BOX(state) {
      state.isActive = false;
    },
  },
  actions: {
    UPDATE_MESSAGE_DATA(context, messageData) {
      context.commit("UPDATE_MESSAGE_DATA", messageData);
    },
    UPDATE_MESSAGE_ACTIVE(context, value) {
      context.commit("UPDATE_MESSAGE_ACTIVE", value);
    },
    SHOW_MESSAGE_BOX_ERROR(context, messageData) {
      context.commit("SHOW_MESSAGE_BOX_ERROR", messageData);
    },
    SHOW_MESSAGE_BOX_SUCCESS(context, messageData) {
      context.commit("SHOW_MESSAGE_BOX_SUCCESS", messageData);
    },
    CLOSE_MESSAGE_BOX(context) {
      context.commit("CLOSE_MESSAGE_BOX");
    },
  },
  getters: {
    messageData: (state) => state.messageData,
    messageBoxColor: (state) => state.messageBoxColor,
    isActive: (state) => state.isActive,
  },
};

export default messageData;
