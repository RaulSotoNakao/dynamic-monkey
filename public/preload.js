const { contextBridge, ipcRenderer } = require("electron");

const validChannels = [
  "READ_FILE",
  "WRITE_FILE",
  "SELECT_DIRECTORY",
  "SAVE_USER_DATA",
  "USER_DATA",
  "GENERATOR_LIST",
  "ADD_GENERATOR",
  "UPDATE_GENERATOR",
  "DELETE_GENERATOR",
  "GET_GENERATOR",
  "GENERATE_STRUCTURE_GENERATOR"
];
contextBridge.exposeInMainWorld("ipc", {
  send: (channel, data) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  on: (channel, func) => {
    if (validChannels.includes(channel)) {
      // Strip event as it includes `sender` and is a security risk
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
