const { contextBridge, ipcRenderer } = require("electron");
const validChannels = require("./electronApi.js");
const { preloadEndpoints } = require("./electronApiNext.js");
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
  ...preloadEndpoints(ipcRenderer),
});
