import * as  path from 'path'
// import * as webpack from 'webpack'
const HtmlWebpackPlugin = require('html-webpack-plugin')
/*
* 使用speed-measure-webpack-plugin和webpack-bundle-analyzer本身也会增加打包时间（webpack-bundle-analyzer特别耗时），
* 所以建议这两个插件在开发分析时使用，而在生产环境去掉
*/ 
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 可视化查看打包模块内容
const smp = new SpeedMeasurePlugin()

// 用于为模块提供中间缓存步骤
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

// 多线程构建 第一次构建将花费正常时间。第二个版本将明显更快。适合用在开发模式development和生产模式production下
const Happypack = require('happypack')

const AutoDllPlugin = require('autodll-webpack-plugin')

// 打包进度
const WebpackBar = require('webpackbar')
const { VueLoaderPlugin } = require('vue-loader')

const config = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: './src/main.ts',
    'index': './src/pages/index/index.ts',
    'hello': './src/pages/hello/hello.ts',
    'ts': './src/pages/ts/index.ts',
    'react': './src/react/index',
    'vue': './src/vue/index'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]/[name].js',
    // clean: true
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  performance: {
    // 解决webpack在打包时,如果资源压缩超过250kb时,会报错提示
    hints:false 
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
        // use: {
        //   loader: 'babel-loader',
        //   // loader: 'happypack/loader?id=babel', //问号后面的查询参数指定了处理这类文件的HappyPack实例的名字
        //   options: {
        //     presets: ['@babel/preset-env']
        //   }
        // },
        use: [
          // webpack4之后使用thread-loader进行多线程构建
          {
            loader: 'thread-loader'
          },
          // 利用缓存 将结果缓存到磁盘中 缓存加载器的编译的结果，避免重新编译
          {
            loader: 'cache-loader'
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
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
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource'
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: 'asset/resource'
      // }
    ]
  },
  devServer: {
    hot: true
  },
  plugins: [
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
      title: 'ts',
      template: './src/pages/ts/index.html',
      filename: 'ts.html',
      chunks: ['ts']
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
    }),
    new WebpackBar(),
    new VueLoaderPlugin(),
    // new BundleAnalyzerPlugin(),
    new HardSourceWebpackPlugin(),
    // new AutoDllPlugin({
    //   inject: true, // 注入到html中
    //   filename: '[name].js',
    //   entry: [
    //     'react',
    //     'react-dom'
    //   ]
    // })
    // new Happypack({
    //   id: 'babel',
    //   // use: ['babel-loader']
    //   loaders: [{
    //     loader: 'babel-loader',
    //     options: {
    //       presets: ['@babel/preset-env']
    //     }
    //   }]
    // })
  ]
}

export default config