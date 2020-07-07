var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var config = {
  entry: ["./src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash].bundle.js?",
    publicPath: "/"
  },
  watchOptions: {
    // Necessary to get reasonable behavior from "watch" on Windows.
    aggregateTimeout: 500,
    poll: 500
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};

module.exports = config;
