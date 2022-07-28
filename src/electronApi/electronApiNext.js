//START DEFINE ENDPOINTS

const { SELECT_DIRECTORY } = require("./service/actions.js");
const {
  GET_USER_DATA,
  SAVE_USER_DATA,
} = require("./service/electronStoreService");
const {
  GENERATOR_LIST,
  ADD_GENERATOR,
  DELETE_GENERATOR,
  GET_GENERATOR,
  GENERATE_STRUCTURE_GENERATOR,
  UPDATE_GENERATOR,
} = require("./controllers/generatorController");

const endpoints = [
  {
    name: "SELECT_DIRECTORY",
    function: SELECT_DIRECTORY,
  },
  {
    name: "GET_USER_DATA",
    function: GET_USER_DATA,
  },
  {
    name: "SAVE_USER_DATA",
    function: SAVE_USER_DATA,
  },
  { name: "GENERATOR_LIST", function: GENERATOR_LIST },
  {
    name: "ADD_GENERATOR",
    function: ADD_GENERATOR,
  },
  {
    name: "DELETE_GENERATOR",
    function: DELETE_GENERATOR,
  },
  {
    name: "GET_GENERATOR",
    function: GET_GENERATOR,
  },
  {
    name: "GENERATE_STRUCTURE_GENERATOR",
    function: GENERATE_STRUCTURE_GENERATOR,
  },
  {
    name: "UPDATE_GENERATOR",
    function: UPDATE_GENERATOR,
  },
];

//FINISH DEFINE ENDPOINTS

// -------------------------------------------------------------------------------------------

// FOR USE IN preload.js example:
// TEST_NAME = (data = {}) => ipcRenderer.invoke('TEST_NAME', data);
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
