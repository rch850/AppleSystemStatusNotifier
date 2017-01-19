module.exports = {
  entry: {
    eventPage: "./src/eventPage.ts",
    popup: "./src/popup.ts"
  },
  output: {
    filename: "./src/[name].js"
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
