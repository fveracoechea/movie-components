const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => ({
  entry: {
    main: path.resolve(__dirname, "src", "app.ts"),
  },
  mode: env.production ? "production" : "development",
  devtool: env.production ? false : "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "docs"),
      watch: true,
    },
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(scss|sass)$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
        options: {
          outputPath: "images",
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      { test: /\.(handlebars|hbs)$/i, loader: "handlebars-loader" },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        env.production ? "production" : "development"
      ),
    }),
    new MiniCssExtractPlugin(),
    new WebpackBar(),
    new HtmlWebpackPlugin({
      hash: true, // This is useful for cache busting
      filename: "index.html",
      template: path.resolve(__dirname, "src", "app.html"),
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
  },
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  target: "web",
  stats: "errors-only",
});
