const { HotModuleReplacementPlugin } = require('webpack')
const { merge } = require('webpack-merge')

const baseConfig = require('./base')

const devConfig = {
  mode: 'development',
  plugins: [
    new HotModuleReplacementPlugin,
  ],
  devServer: {
    hot: true,
    port: 5365,
  },
  devtool: 'inline-source-map',
}

module.exports = merge(baseConfig, devConfig)
