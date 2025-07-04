const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  console.log("mode >> ", argv.mode);
  const isDev = argv.mode === "development";
  const isProd = argv.mode === "production";
  return {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].js",
      clean: true,
      chunkFilename: "js-chunks/chunk[name]-[contenthash].js",
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: "css/[name]-[contenthash].css",
          chunkFilename: "css/chunk[id]-[contenthash].css",
        }),
      isProd && new BundleAnalyzerPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
              ],
            },
          },
        },

        {
          test: /\.(s?css|sass)$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: isDev
                    ? "[path][name]_[local]"
                    : "[hash:base64]",
                },
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [["postcss-preset-env"]],
                },
              },
            },
            "sass-loader",
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
    devServer: isDev
      ? {
          port: env.port ?? 5000,
          open: true,
          historyApiFallback: true,
        }
      : undefined,
  };
};
