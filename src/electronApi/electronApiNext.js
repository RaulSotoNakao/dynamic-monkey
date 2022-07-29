// -------------------------------------------------------------------------------------------

//ALL ENDPOINTS

const endpointsMerge = {
  ...require("./controllers/generatorController"),
  ...require("./service/actions"),
  ...require("./service/electronStoreService"),
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
const dynamicImportElectronaApi = (ipcMain) =>
  endpointsName.map((endpoint) => {
    ipcMain.handle(endpoint, endpointsMerge[endpoint]);
  });

module.exports = { preloadEndpoints, dynamicImportElectronaApi };
