var merge = require("webpack-merge");
var common = require("./webpack.common");
require("dotenv").config();

module.exports = merge.smart(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: process.env.NODE_PORT,
    publicPath: common.output.publicPath,
    hot: true
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  }
});
