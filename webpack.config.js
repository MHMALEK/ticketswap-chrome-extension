const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const CopyPlugin = require("copy-webpack-plugin");

const setEnv = () => {
  let mode = "development";

  if (process.env.NODE_ENV === "production") {
    mode = "production";
  } else {
    mode = "development";
  }
  return mode;
};

const alias = {};

const fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2",
];

module.exports = {
  mode: setEnv(),
  entry: {
    background: "./src/background.js",
    content: "./src/content.js",
    popup: "./src/popup.js",
    options: "./src/options.js",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: alias,
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new CopyPlugin({
      patterns: [{ from: "manifest.json" }],
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      template: "./src/popup.html",
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/options.html",
      filename: "options.html",
      chunks: ["options"],
    }),
  ],
};
