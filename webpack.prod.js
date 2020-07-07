var merge = require("webpack-merge");
var common = require("./webpack.common");

module.exports = merge.smart(common, {
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
});
