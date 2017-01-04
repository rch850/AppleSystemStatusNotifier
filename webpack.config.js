module.exports = {
  entry: "./src/eventPage.ts",
  output: {
    filename: "./src/eventPage.js"
  },
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".ts", ".js"],
  },

  module: {
    loaders: [
      { test: /\.ts$/, loader: "awesome-typescript-loader" }
    ],
    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  }
};
