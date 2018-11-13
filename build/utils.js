const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
const path = require('path')

const cssLang = [
  // {
  //   name: 'stylus',
  //   reg: /\.stylus$/,
  //   loader: 'stylus-loader'
  // },
  // {
  //   name: 'less',
  //   reg: /\.less$/,
  //   loader: 'less-loader'
  // },
  {
    name: 'sass',
    reg: /\.scss$/,
    loader: 'sass-loader'
  }
  // {
  //   name: 'stylus',
  //   reg: /\.styl$/,
  //   loader: 'stylus-loader'
  // }
]

function genLoaders(lang) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: true
    }
  }

  const loaders = [cssLoader]

  loaders.push(lang.loader)

  if (isProd) {
    // 生产环境需要提取 css
    loaders = ExtractTextPlugin.extract({
      // 提取 CSS
      // 样式解析，其中css - loader用于解析，而vue - style - loader则将解析后的样式嵌入js代码
      // 关于 webpack 对样式文件的处理请参考: https://github.com/zhengweikeng/blog/issues/9
      // 支持 import/require 引入CSS文件，实际应用中并不推荐使用 import 引入 css，参考：https://github.com/postcss/postcss-loader/issues/35
      //
      // 也可以使用如下的配置
      // {
      //  test: /\.css$/,
      //  use: ["vue-style-loader", "css-loader"]
      // }
      // 可以发现，webpack的loader的配置是从右往左的，从上面代码看的话，就是先使用css-loader之后使用style-loader
      // webpack1 loader 后缀可以不写, webpack2 则不可省略
      // { test: /\.css$/, loader: 'vue-style!css' }
      use: loaders,
      allChunks: true, // extract-text-webpack-plugin 默认不会提取异步模块中的 CSS，需要加上配置
      filename: "css/[name].[contenthash].css"
    })
  } else {
    loaders.unshift('style-loader')
  }

  return loaders
}

exports.styleLoaders = function () {
  const output = []
  cssLang.forEach(lang => {
    output.push({
      test: lang.reg,
      use: genLoaders(lang)
    })
  })

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      // title: packageConfig.name,
      titel: 'title',
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
