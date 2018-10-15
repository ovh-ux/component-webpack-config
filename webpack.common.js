const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (opts) => {
  const lib = opts.library || path.basename(process.cwd());
  return {
    mode: 'production',
    output: {
      path: path.resolve(process.cwd(), './dist'),
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
  };
};
