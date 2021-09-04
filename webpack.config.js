// const path = require("path");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  target: "web",
  entry: ["regenerator-runtime/runtime", "./src/index.js"],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".css"],
    alias: {
      // add as many aliases as you like!
      components: path.resolve(__dirname, "src/components"),
    },
    fallback: {
      // path: require.resolve("path-browserify"),
      fs: false,
      assert: require.resolve("assert/"),
      os: require.resolve("os-browserify/browser"),
      constants: require.resolve("constants-browserify"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
    },
  },
  // devtool: "eval-cheap-source-map",
  devtool: "eval",
  module: {
    rules: [
      { test: /\.(js|jsx)/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      //   {
      //     test: /\.m?js/,
      //     resolve: {
      //         fullySpecified: false
      //     }
      // },
      {
        test: /\.(woff(2)?|ttf|eot|jpg|jpeg|png|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.json5$/i,
        loader: "json5-loader",
        type: "javascript/auto",
        options: {
          esModule: true,
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true,
    overlay: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "esBUild",
      template: "src/index.html",
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: "assets", to: "assets" }],
    // }),
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
      React: "react",
    }),
  ],
};
