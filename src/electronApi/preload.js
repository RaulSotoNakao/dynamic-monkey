const { contextBridge, ipcRenderer } = require("electron");
const { preloadEndpoints } = require("./electronApiNext.js");
contextBridge.exposeInMainWorld("ipc", {
  ...preloadEndpoints(ipcRenderer),
});
