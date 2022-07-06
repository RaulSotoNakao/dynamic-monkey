"use strict";

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  dialog,
  clipboard,
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";

import {
  getAllGeneratorData,
  addNewGenerator,
  updateGenerator,
  deleteGenerator,
  getGeneratorByName,
} from "./utils/generatorService";
const isDevelopment = process.env.NODE_ENV !== "production";
const Store = require("electron-store");
import path from "path";
const store = new Store();

ipcMain.on("SELECT_DIRECTORY", (event) => {
  dialog
    .showOpenDialog({
      properties: ["openDirectory"],
    })
    .then((result) => {
      if (!result.canceled) {
        event.reply("SELECT_DIRECTORY", { selected_dir: result.filePaths[0] });
      }
    });
});

ipcMain.on("READ_FILE", (event, payload) => {
  const formats = clipboard.availableFormats();
  console.log(formats);

  event.reply("READ_FILE", { content: store.get("unicorn") });
});

ipcMain.on("SAVE_USER_DATA", (event, payload) => {
  store.set("USER_DATA", { ...payload });
  event.reply("SAVE_USER_DATA", { content: store.get("USER_DATA") });
});
ipcMain.on("USER_DATA", (event) => {
  const userData = store.get("USER_DATA");
  event.reply("USER_DATA", { content: { userData } });
});

// GENERATOR CRUD

ipcMain.on("ADD_GENERATOR", (event, payload) => {
  const userData = store.get("USER_DATA");
  addNewGenerator(userData.urlDirectorioDeTrabajo, payload)
    .then(() => getAllGeneratorData(userData.urlDirectorioDeTrabajo))
    .then((generatorList) =>
      event.reply("GENERATOR_LIST", { content: generatorList })
    );
});

ipcMain.on("UPDATE_GENERATOR", (event, payload) => {
  const userData = store.get("USER_DATA");
  updateGenerator(userData.urlDirectorioDeTrabajo, payload)
    .then(() => getAllGeneratorData(userData.urlDirectorioDeTrabajo))
    .then((generatorList) =>
      event.reply("GENERATOR_LIST", { content: generatorList })
    );
});

ipcMain.on("DELETE_GENERATOR", (event, payload) => {
  const userData = store.get("USER_DATA");
  deleteGenerator(userData.urlDirectorioDeTrabajo, payload)
    .then(() => getAllGeneratorData(userData.urlDirectorioDeTrabajo))
    .then((generatorList) =>
      event.reply("GENERATOR_LIST", { content: generatorList })
    );
});

ipcMain.on("GET_GENERATOR", (event, payload) => {
  const userData = store.get("USER_DATA");
  getGeneratorByName(userData.urlDirectorioDeTrabajo, payload).then(
    (selectedGenerator) =>
      event.reply("GET_GENERATOR", { content: selectedGenerator })
  );
});

ipcMain.on("GENERATOR_LIST", (event, payload) => {
  const userData = store.get("USER_DATA");
  getAllGeneratorData(userData.urlDirectorioDeTrabajo).then((generatorList) => {
    event.reply("GENERATOR_LIST", { content: generatorList });
  });
});

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,

      // __static is set by webpack and will point to the public directory
      preload: path.resolve(__static, "preload.js"),
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
