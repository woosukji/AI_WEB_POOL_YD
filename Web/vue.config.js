const path = require("path");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/AI_WEB_POOL_YD/" : "/",
  transpileDependencies: [
    "vuetify",
  ],
  outputDir: path.resolve(__dirname, "../docs"),
};
