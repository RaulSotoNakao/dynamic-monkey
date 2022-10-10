const { contextBridge, ipcRenderer } = require("electron");
const { preloadEndpoints } = require("./electronApiNext.js");
contextBridge.exposeInMainWorld("ipc", {
  ...preloadEndpoints(ipcRenderer),
  // ...{
  //   CLOSE_WINDOW: (data) => ipcRenderer.invoke("CLOSE_WINDOW", data),
  //   MINIMIZE_WINDOW: (data) => ipcRenderer.invoke("MINIMIZE_WINDOW", data),
  // },
});
