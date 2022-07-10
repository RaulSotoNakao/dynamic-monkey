import {
  getFilesNamesOfDirectory,
  readFile,
  writeFile,
  createDir,
  renameDir,
  removeRecursively,
} from "./fileSystemService";
const Store = require("electron-store");
import Mustache from "mustache";

import path from "path";

const recursiveCreator = (
  templatesList,
  dirToCreateStructure,
  templateDefinitions
) => {
  return templatesList.reduce((previousPromise, item) => {
    return previousPromise
      .then(() => {
        if (!!item.file) {
          const rendered = Mustache.render(item.template, templateDefinitions);
          const file = path.join(dirToCreateStructure, item.name);
          return writeFile(file, rendered)
            .then(() => console.log(item.name))
            .catch((err) => console.log(err));
        } else if (item.children && item.children.length) {
          return createDir(path.join(dirToCreateStructure, item.name))
            .catch(() => true)
            .then(() =>
              recursiveCreator(
                item.children,
                path.join(dirToCreateStructure, item.name),
                templateDefinitions
              )
            )
            .then(() => console.log(item.name))
            .catch((err) => console.log(err));
        } else {
          return Promise.resolve(true);
        }
      })
      .catch((err) => console.log(err));
  }, Promise.resolve());
};

const generateStructureGenerator = async ({ selectedGenerator }) => {
  const { dirToCreateStructure } = selectedGenerator;
  const { templateDefinitions } = selectedGenerator;
  const { templatesList } = selectedGenerator;

  // 1º Recorro todos los listados recursivamente
  // 2º voy creando carpetas
  // 3º voy renderizando con mustache los templates

  return recursiveCreator(
    templatesList,
    dirToCreateStructure,
    templateDefinitions
  );
};

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
    .then((dirData) => dirData)
    .catch((err) => {
      console.log(err);
      return [];
    });
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
        const sameName = selectedGenerator.name === generator.name;
        return !sameName
          ? renameDir(
              path.join(urlDirectorioDeTrabajo, selectedGenerator.name),
              path.join(urlDirectorioDeTrabajo, generator.name)
            )
          : Promise.resolve();
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
  generateStructureGenerator,
};
