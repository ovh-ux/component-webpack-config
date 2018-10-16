const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (opts) => {
  const workingDirectory = process.cwd();
  const lib = opts.library || path.basename(workingDirectory);
  const packageConfig = JSON.parse(fs.readFileSync(path.resolve(workingDirectory, 'package.json')));
  const peerDeps = Object.keys(packageConfig.peerDependencies || {});

  return {
    mode: 'development',
    output: {
      path: path.resolve(workingDirectory, './dist'),
      filename: `${lib}.js`,
      library: `${lib}`,
      libraryTarget: 'commonjs',
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
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
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
        filename: `${lib}.css`,
      }),
    ],
    externals: peerDeps,
  };
};
