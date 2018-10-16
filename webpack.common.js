const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (opts) => {
  const workingDirectory = process.cwd();
  const lib = opts.library;
  const packageConfig = JSON.parse(fs.readFileSync(path.resolve(workingDirectory, 'package.json')));
  const peerDeps = Object.keys(packageConfig.peerDependencies || {});

  return {
    mode: 'production',
    output: {
      path: path.resolve(workingDirectory, './dist'),
      filename: `${lib}.min.js`,
      library: `${lib}`,
      libraryTarget: 'umd',
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            require.resolve('@babel/preset-env'),
          ],
          plugins: [
            require.resolve('@babel/plugin-syntax-dynamic-import'),
            require.resolve('babel-plugin-angularjs-annotate'),
          ],
        },
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              relativeUrls: false,
            },
          },
        ],
      }, {
        test: /\.html$/,
        loader: 'raw-loader',
      }],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `${lib}.min.css`,
      }),
    ],
    externals: peerDeps,
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
          },
        }),
      ],
    },
    devtool: 'source-map',
  };
};
