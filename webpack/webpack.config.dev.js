const plugins = require("./webpack.plugins");
const rules = require("./webpack.rules");

module.exports = (env) => {
  return {
    mode: "development",
    entry: ["./src/main.tsx"],
    module: {
      rules: rules(env),
    },
    output: {
      filename: "[name].js",
      chunkFilename: "[name].chunk.js",
    },
    plugins: plugins(env),
    resolve: {
      extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
      alias: require("./webpack.aliases"),
    },
    stats: "errors-warnings",
    // watch: true,
    devtool: "cheap-module-source-map",
    infrastructureLogging: {
      level: "none",
    },
    devServer: {
      port: 9003,
      open: true,
      historyApiFallback: true,
      proxy: {
        "/apix": {
          changeOrigin: true,
          target: {
            host: "localhost",
            protocol: "http:",
            port: 9001,
          },
          pathRewrite: {
            "^/api": "",
          },
        },
      },
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    performance: {
      hints: false,
    },
  };
};
