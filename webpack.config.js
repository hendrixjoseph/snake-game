/*global __dirname */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

let appName = "snake";

module.exports = {
  entry: {
    app: "./src/ts/SnakeGame.ts",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: {
    phaser: "Phaser",
  },
  output: {
    filename: `${appName}.js`,
    path: path.resolve(__dirname, "public"),
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./node_modules/phaser/dist/phaser.min.js",
          to: "lib",
        },
        {
          from: "./src/*.{css,html,js,json}",
          to: "[name][ext]",
        },
        {
          from: "./src/img/",
          to: "img",
        },
      ],
    }),
  ],
  performance: {
    assetFilter: function (assetFilename) {
      let customExclusions = ["lib/phaser.min.js"];
      if (customExclusions.includes(assetFilename)) {
        return false;
      }
      return !/\.map$/.test(assetFilename);
    },
  },
  devServer: {
    open: true,
  },
};
