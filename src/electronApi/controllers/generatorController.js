import { GET_USER_DATA } from "../service/electronStoreService";
import {
  getAllGeneratorData,
  addNewGenerator,
  deleteGenerator,
  getGeneratorByName,
  generateStructureGenerator,
  updateGenerator,
} from "../service/generatorService";

const GENERATOR_LIST = (event, payload) => {
  const userData = GET_USER_DATA();
  return getAllGeneratorData(userData.urlDirectorioDeTrabajo);
};

const GET_GENERATOR = (event, payload) => {
  const userData = GET_USER_DATA();
  return getGeneratorByName(userData.urlDirectorioDeTrabajo, payload).then(
    (selectedGenerator) => ({ content: selectedGenerator })
  );
};

const ADD_GENERATOR = (event, payload) => {
  const userData = GET_USER_DATA();

  return addNewGenerator(userData.urlDirectorioDeTrabajo, payload).then(() =>
    getAllGeneratorData(userData.urlDirectorioDeTrabajo)
  );
};

const UPDATE_GENERATOR = (event, payload) => {
  const userData = GET_USER_DATA();

  return updateGenerator(userData.urlDirectorioDeTrabajo, payload)
    .then(() => getAllGeneratorData(userData.urlDirectorioDeTrabajo))
    .then((generatorList) => ({ content: generatorList }));
};

const DELETE_GENERATOR = (event, payload) => {
  const userData = GET_USER_DATA();

  return deleteGenerator(userData.urlDirectorioDeTrabajo, payload).then(() =>
    getAllGeneratorData(userData.urlDirectorioDeTrabajo)
  );
};

const GENERATE_STRUCTURE_GENERATOR = (event, payload) => {
  return generateStructureGenerator(payload)
    .then(() => true)
    .catch(() => false);
};

export {
  GET_GENERATOR,
  GENERATOR_LIST,
  ADD_GENERATOR,
  UPDATE_GENERATOR,
  DELETE_GENERATOR,
  GENERATE_STRUCTURE_GENERATOR,
};
