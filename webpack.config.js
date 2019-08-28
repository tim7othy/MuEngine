const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-source-map',
  entry: {
    main: './src/index.ts'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devServer: {
    contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'dist')],// 访问url域名对应的根目录
    open: true, // 打开浏览器，访问当前服务器
    port: 5000, // 服务器绑定端口
    host: 'localhost', // 服务器运行ip
    publicPath: '/',
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}