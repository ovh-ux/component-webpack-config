const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = (opts = {}) => ({
  config: commonConfig(opts),
  merge: config => merge(
    commonConfig(opts),
    config,
  ),
});
