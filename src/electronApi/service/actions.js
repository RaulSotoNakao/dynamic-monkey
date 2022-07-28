import { dialog } from "electron";

const SELECT_DIRECTORY = (event, data) => {
  return dialog
    .showOpenDialog({
      properties: ["openDirectory"],
    })
    .then((result) =>
      !result.canceled
        ? {
            selected_dir: result.filePaths[0],
          }
        : { selected_dir: "" }
    );
};

export { SELECT_DIRECTORY };
