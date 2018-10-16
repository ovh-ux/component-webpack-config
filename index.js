const merge = require('webpack-merge');
const commonjsConfig = require('./webpack.commonjs');
const umdConfig = require('./webpack.umd');

module.exports = {
  commonjs: (opts = {}) => ({
    config: commonjsConfig(opts),
    merge: config => merge(
      commonjsConfig(opts),
      config,
    ),
  }),
  umd: (opts = {}) => ({
    config: umdConfig(opts),
    merge: config => merge(
      umdConfig(opts),
      config,
    ),
  }),
};
