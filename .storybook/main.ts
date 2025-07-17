import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-webpack5-compiler-babel', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      components: path.resolve(__dirname, '../src/components'),
      assets: path.resolve(__dirname, '../src/assets'),
      hooks: path.resolve(__dirname, '../src/hooks'),
      styles: path.resolve(__dirname, '../src/styles'),
      store: path.resolve(__dirname, '../src/store'),
    };
    config.module?.rules?.push(
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: {
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          },
          require.resolve('sass-loader'),
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          require.resolve('sass-loader'),
        ],
      }
    );

    return config;
  },
};
export default config;
