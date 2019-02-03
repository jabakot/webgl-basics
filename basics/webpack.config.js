const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.glsl$/,
        use: "raw-loader"
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "./"),
    filename: "index.js"
  }
};
