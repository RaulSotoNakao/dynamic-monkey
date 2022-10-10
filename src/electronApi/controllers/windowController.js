const CLOSE_WINDOW = (event, payload, app, win) => {
  app.exit();
};

const MINIMIZE_WINDOW = (event, payload, app, win) => {
  win.isMinimized() ? win.restore() : win.minimize();
};

const MAXIMIZE_WINDOW = (event, payload, app, win) => {
  win.maximize();
};

export { CLOSE_WINDOW, MINIMIZE_WINDOW, MAXIMIZE_WINDOW };
