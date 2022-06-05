import fs from "fs";
import util from "util";
import path from "path";

const createDir = (dirName) => {
  return util
    .promisify(fs.mkdir)(dirName)
    .then(() => {
      console.log(`Dir ${dirName} Created`);
    });
};

const getFilesNamesOfDirectory = (dirName) => {
  return util
    .promisify(fs.readdir)(dirName)
    .then((filesNameList) =>
      filesNameList.map((file) => path.parse(file).name)
    );
};

const renameDir = (oldDirName, newDirName) => {
  return util.promisify(fs.rename)(oldDirName, newDirName);
};

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const removeRecursively = (dir) => {
  return util.promisify(fs.rm)(dir, { recursive: true, force: true });
};

export {
  createDir,
  getFilesNamesOfDirectory,
  readFile,
  writeFile,
  renameDir,
  removeRecursively,
};
