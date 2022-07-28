const Store = require("electron-store");
const store = new Store();

const GET_USER_DATA = () => {
  return store.get("USER_DATA");
};

const SAVE_USER_DATA = (event, payload) => {
  store.set("USER_DATA", { ...payload });
  return GET_USER_DATA();
};

export { GET_USER_DATA, SAVE_USER_DATA };
