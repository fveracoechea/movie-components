const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// helpers
const { supportedLocales } = require("./date-fns");
const getPages = require("./getPages")

const { pages, entries: entry } = getPages();

module.exports = (env) => ({
  entry,
  mode: env.production ? "production" : "development",
  devtool: env.production ? false : "eval-source-map",
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
          // {
          //   loader: "file-loader",
          //   options: {
          //     outputPath: "styles",
          //     name: "[contenthash].css",
          //   },
          // },
          "raw-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.html$/i,
        use: ["raw-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
        options: {
          outputPath: "images",
        },
      },
      {
        test: /\.(handlebars|hbs)$/i,
        loader: "handlebars-loader",
        options: {
          partialDirs: [path.join(__dirname, "src", "partials")],
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/images", to: "images" },
        { from: "src/global.css", to: "styles/global.css" },
      ],
    }),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: "./styles/global.css",
      chunkFilename: "./src/global.css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        env.production ? "production" : "development"
      ),
    }),
    new WebpackBar(),
    ...pages.map((page) => new HtmlWebpackPlugin(page)),
    new webpack.ContextReplacementPlugin(
      /date\-fns[\/\\]/,
      new RegExp(`[/\\\\\](${supportedLocales.join("|")})[/\\\\\]index\.js$`)
    ),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
  },
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "./scripts/[name].[contenthash].js",
    clean: true,
  },
  target: "web",
  stats: "errors-only",
});
