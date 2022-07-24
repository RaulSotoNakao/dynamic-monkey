//START DEFINE ENDPOINTS



const { SELECT_DIRECTORY } = require("./actions.js");

const endpoints = [
  {
    name: "SELECT_DIRECTORY",
    function: SELECT_DIRECTORY,
  },
];



//FINISH DEFINE ENDPOINTS




// -------------------------------------------------------------------------------------------



// FOR USE IN preload.js example:
// SELECT_DIRECTORY = (data = {}) => ipcRenderer.invoke('SELECT_DIRECTORY', data);
const preloadEndpoints = (ipcRenderer) =>
  endpoints.reduce((previusEndpointList, newEndpoint) => {
    previusEndpointList[newEndpoint.name] = (data = {}) =>
      ipcRenderer.invoke(newEndpoint.name, data);
    return previusEndpointList;
  }, []);

// FOR USE IN background.js
const dynamicImportElectronaApi = (ipcMain) =>
  endpoints.map((endpoint) => {
    ipcMain.handle(endpoint.name, endpoint.function);
  });

module.exports = { preloadEndpoints, endpoints, dynamicImportElectronaApi };
