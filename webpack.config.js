const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const isProd = argv.mode === 'production';
  return {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true,
      chunkFilename: 'js-chunks/chunk[name]-[contenthash].js',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: 'css/[name]-[contenthash].css',
          chunkFilename: 'css/chunk[id]-[contenthash].css',
        }),
      isProd && new BundleAnalyzerPlugin(),
      isDev &&
        new ESLintWebpackPlugin({
          extensions: ['js', 'jsx', 'ts', 'tsx'],
          failOnError: false, // не останавливать сборку при ошибках
          failOnWarning: false, // не останавливать сборку при предупреждениях
          emitWarning: true, // выводить предупреждения
          emitError: true,
        }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset', // Для Webpack 5
          generator: {
            filename: 'images/[name]-[hash][ext]', // Путь вывода изображений
          },
        },
        {
          test: /\.(s?css|sass)$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isDev ? '[path][name]_[local]' : '[hash:base64]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['postcss-preset-env']],
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    devServer: isDev
      ? {
          port: env.port ?? 5000,
          open: true,
          historyApiFallback: true,
          client: {
            overlay: {
              warnings: false,
            },
          },
        }
      : undefined,
  };
};
