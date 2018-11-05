const webpack = require('webpack')
const path = require('path')

function resolve(relPath) {
  return path.resolve(__dirname, relPath)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  cache: true,
  entry: {
    main: resolve ('../src/index.js')
  },
  output: {
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.styl', '.stylus', 'pug'],
    modules: [path.resolve(__dirname, '../node_modules')],
    alias: {
      '@': resolve('../src')
    }
  },
  module: {
    rules: [{
        test: require.resolve('lodash'),
        use: [{
          loader: 'expose-loader',
          options: '_'
        }]
      },
      {
        test: /\.js$/,
        use: "babel-loader?cacheDirectory=true",
        include: [resolve('../src')], // src是项目开发的目录
        exclude: [path.resolve(__dirname, '../node_modules')] // 不需要编译node_modules下的js
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            // 将图片都放入images文件夹下，[hash:7]防缓存
            name: 'images/[name].[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            // 将字体放入fonts文件夹下
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
    })
  ]
}
