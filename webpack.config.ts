import * as  path from 'path'
import * as webpack from 'webpack'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const config = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: './src/main.ts',
    'index': './src/pages/index/index.ts',
    'hello': './src/pages/hello/hello.ts',
    'react': './src/react/index',
    'vue': './src/vue/index'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]/[name].js',
    clean: true
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将js字符串生成style节点
          'style-loader',
          // 将css转化成js模块
          'css-loader',
          // 将sass编译成css
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.vue$/i,
        use: ['vue-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ts$/i,
        use: ['ts-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  devServer: {
    hot: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'index',
      template: './src/pages/index/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: 'hello',
      template: './src/pages/hello/hello.html',
      filename: 'hello.html',
      chunks: ['hello']
    }),
    new HtmlWebpackPlugin({
      title: 'react',
      template: './public/react/index.html',
      filename: 'react.html',
      chunks: ['react']
    }),
    new HtmlWebpackPlugin({
      title: 'react',
      template: './public/vue/index.html',
      filename: 'vue.html',
      chunks: ['vue']
    })
  ]
}

export default config