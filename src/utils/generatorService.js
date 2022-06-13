import {
  getFilesNamesOfDirectory,
  readFile,
  createDir,
  renameDir,
  removeRecursively,
} from "./fileSystemService";
const Store = require("electron-store");

import path from "path";

const getAllGeneratorData = (urlDirectorioDeTrabajo) => {
  const snippetList = urlDirectorioDeTrabajo
    ? getFilesNamesOfDirectory(urlDirectorioDeTrabajo)
    : Promise.resolve([]);
  //falta mirar si en el directorio existen otra cosa que no es un directorio con el definition.json.    qué pasará??? :)
  return snippetList
    .then((dirNames) =>
      Promise.all(
        dirNames.map((dirName) =>
          readFile(
            path.join(urlDirectorioDeTrabajo, dirName, "definition.json")
          )
            .then((fileData) => fileData.toString())
            .then((fileData) => JSON.parse(fileData))
        )
      )
    )
    .then((dirData) => dirData);
};

const getGeneratorByName = (urlDirectorioDeTrabajo, name) =>
  getAllGeneratorData(urlDirectorioDeTrabajo)
    .then((generatorList) =>
      // get generatorByName
      generatorList.map((g) => g.definition).find((s) => s.name === name)
    )
    .then((selectedGenerator) => {
      if (selectedGenerator) {
        const generatorStore = new Store({
          name: "definition",
          cwd: path.join(urlDirectorioDeTrabajo, selectedGenerator.name),
        });
        return generatorStore.get("definition");
      }
    })
    .catch((err) => {
      console.log(err);
    });

const updateGenerator = (urlDirectorioDeTrabajo, generator) =>
  getAllGeneratorData(urlDirectorioDeTrabajo)
    .then((generatorList) =>
      // get generatorById
      generatorList.map((g) => g.definition).find((s) => s.id === generator.id)
    )
    .then((selectedGenerator) => {
      if (selectedGenerator) {
        const generatorStore = new Store({
          name: "definition",
          cwd: path.join(urlDirectorioDeTrabajo, selectedGenerator.name),
        });
        generatorStore.set("definition", generator);
        return renameDir(
          path.join(urlDirectorioDeTrabajo, selectedGenerator.name),
          path.join(urlDirectorioDeTrabajo, generator.name)
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });

const addNewGenerator = (urlDirectorioDeTrabajo, newGenerator) => {
  return createDir(path.join(urlDirectorioDeTrabajo, newGenerator.name))
    .catch(() => true)
    .then((dirAlreadyExist) => {
      if (!dirAlreadyExist) {
        const generatorStore = new Store({
          name: "definition",
          cwd: path.join(urlDirectorioDeTrabajo, newGenerator.name),
        });
        generatorStore.set("definition", newGenerator);
      }
    });
};

const deleteGenerator = (urlDirectorioDeTrabajo, id) =>
  getAllGeneratorData(urlDirectorioDeTrabajo)
    .then((generatorList) =>
      // get generatorById
      generatorList.map((g) => g.definition).find((s) => s.id === id)
    )
    .then((selectedGenerator) => {
      if (selectedGenerator) {
        return removeRecursively(
          path.join(urlDirectorioDeTrabajo, selectedGenerator.name)
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });

export {
  getAllGeneratorData,
  addNewGenerator,
  updateGenerator,
  getGeneratorByName,
  deleteGenerator,
};
