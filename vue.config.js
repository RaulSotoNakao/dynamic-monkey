module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: { preload: "src/electronApi/preload.js" },
    },
  },
};
