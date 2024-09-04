const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    open: false,
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    fallback: { path: false },
    extensions: [".ts", ".tsx", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(process.cwd(), "tsconfig.json"),
      }),
    ],
  },
  plugins: [
    new ReactRefreshPlugin({
      overlay: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              configFile: path.resolve(process.cwd(), "babel.config.js"),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
  ],
};
