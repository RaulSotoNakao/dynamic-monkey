// -------------------------------------------------------------------------------------------

//ALL ENDPOINTS

const endpointsMerge = {
  ...require("./controllers/generatorController"),
  ...require("./controllers/mysqlController"),
  ...require("./service/actions"),
  ...require("./service/electronStoreService"),
  ...require("./controllers/windowController"),
};

//ALL ENDPOINTS

// -------------------------------------------------------------------------------------------

const endpointsName = Object.keys(endpointsMerge);

// TO USE IN preload.js example:
// TEST_NAME = (data = {}) => ipcRenderer.invoke('TEST_NAME', data);
const preloadEndpoints = (ipcRenderer) =>
  endpointsName.reduce((previusEndpointList, newEndpoint) => {
    previusEndpointList[newEndpoint] = (data = {}) =>
      ipcRenderer.invoke(newEndpoint, data);
    return previusEndpointList;
  }, []);

// TO USE IN background.js
// ipcMain.handle("endpointName", function);
const dynamicImportElectronaApi = (ipcMain, app, win) => {
  return endpointsName.map((endpoint) => {
    const handler = (event, payload) =>
      endpointsMerge[endpoint](event, payload, app, win);

    ipcMain.handle(endpoint, handler);
  });
};

module.exports = { preloadEndpoints, dynamicImportElectronaApi };
