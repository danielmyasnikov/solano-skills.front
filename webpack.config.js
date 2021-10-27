const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "./dist"),
    compress: true,
    hot: true,
    port: 8080,
  },
  entry: {
    main: "./src/index.js",
  },

  devtool: "source-map",

  resolve: {
    modules: [
      path.resolve(__dirname, "assets"),
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "src/components"),
    ],
    extensions: ["*", ".js", ".jsx", ".less"],
    alias: {
      assets: path.resolve(__dirname, "assets"),
      components: path.resolve(__dirname, "src/components"),
      store: path.resolve(__dirname, "src/store"),
      src: path.resolve(__dirname, "src"),
    },
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: `public/index.html`,
      favicon: "public/favicon.ico",
      name: "index",
      inject: true,
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
  ],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
      },
      {
        test: /\.(css|less)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                localIdentName: "[local]___[hash:base64:5]",
              },
              importLoaders: 1,
            },
          },
          "less-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(j|t)s$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.svg$/,
        issuer: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
};
