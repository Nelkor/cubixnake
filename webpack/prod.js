const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')

const baseConfig = require('./base')

const prodConfig = {
  mode: 'production',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new CleanWebpackPlugin,
  ],
}

module.exports = merge(baseConfig, prodConfig)
