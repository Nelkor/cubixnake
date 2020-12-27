const path = require('path')
const { readdirSync } = require('fs')

const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssPlugin = require('mini-css-extract-plugin')

const modules = 'src/modules'
const resolve = str => path.resolve(__dirname, `../${str}`)
const modulesDir = readdirSync(resolve(modules))

const copyPluginConfig = {
  patterns: [
    {
      from: resolve('src/favicon.png'),
      to: resolve('dist'),
    },
  ],
}

module.exports = {
  target: 'web',
  entry: './src/main.ts',
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': resolve('src'),

      ...modulesDir.reduce((acc, cur) => {
        acc[`@${cur}`] = resolve(`${modules}/${cur}`)

        return acc
      }, {}),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.glsl$/,
        use: 'raw-loader',
      },
      {
        test: /\.(jpg|png)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlPlugin({ template: './src/index.html' }),
    new CopyPlugin(copyPluginConfig),
    new MiniCssPlugin({ filename: '[hash].css' }),
  ],
}
