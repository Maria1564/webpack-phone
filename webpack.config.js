const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = (env, argv) => {
  console.log("mode >> ", argv.mode);
  const isDev = argv.mode === "development";
  const isProd = argv.mode === "production";
  return {
    // mode: env.mode ?? "development", //build:dev -> development || build.prod -> production
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
          use: "ts-loader",
          exclude: /node_modules/,
        },
        //  {
        //   test: /\.module\.(sa|sc|c)ss$/,
        //   use: [
        //     isDev ? "style-loader" : MiniCssExtractPlugin.loader,
        //     {
        //       loader: "css-loader",
        //       options: {
        //         modules: {
        //           localIdentName: isDev ? "[path][name]-[local]" :  "[hash:base64]",
        //           exportLocalsConvention: "asIs"
        //         }
        //       }
        //     },
        //     {
        //       loader: "postcss-loader",
        //       options: {
        //         postcssOptions: {
        //           plugins: [["postcss-preset-env"]],
        //         },
        //       },
        //     },
        //     "sass-loader",
        //   ],
        // },
        {
          test: /\.(s?css|sass)$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: false,
              },
            },
            {
              loader: "postcss-loader",
              // options: {
              //   postcssOptions: {
              //     plugins: [["postcss-preset-env"]],
              //   },
              // },
            },
            "sass-loader",
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss"],
    },
    devServer: isDev
      ? {
          port: env.port ?? 5000,
          open: true,
          // hot: true
        }
      : undefined,
  };
};
