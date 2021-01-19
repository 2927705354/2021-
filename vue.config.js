const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production';

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
// externals
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  vant: 'vant',
  axios: 'axios',
  'element-ui':'ELEMENT',
  'qs': 'Qs',
  'mint-ui': 'MINT',
  'moment': 'moment',
  'html2canvas': 'html2canvas',
  'vue-video-player': 'VueVideoPlayer',
  'swiper': 'Swiper',
  'mobile-detect': 'MobileDetect'
}
// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: ['https://cdn.jsdelivr.net/npm/vant@2.12/lib/index.css',
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/vant@2.12/lib/vant.min.js',
      'https://unpkg.com/element-ui/lib/index.js',
      'lib/echarts.custom.min.js'
    ]
  }
}
module.exports = {
  // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: 'warning',
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,
  // webpack相关配置
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', path.resolve(__dirname, './src'))

    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    config.plugin('html').tap(args => {
      if (IS_PROD) {
        args[0].cdn = cdn.build
      } else {
        args[0].cdn = cdn.dev
      }
      return args
    })
  },
  // css相关配置
  //   css: {
  //     // 是否分离css（插件ExtractTextPlugin）
  //     extract: true,
  //     // 是否开启 CSS source maps
  //     sourceMap: false,
  //     // css预设器配置项
  //     loaderOptions: {},
  //     // 是否启用 CSS modules for all css / pre-processor files.
  //     modules: false
  //   },
  // 是否使用 thread-loader
  // parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  // pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    // open: true,//是否自动打开浏览器
    // host: 'localhost',
    // port: 8080,
    // https: false,
    // hotOnly: false,
    // // http 代理配置  跨域配置

    // proxy: {
    //     // 以api开头的域名解决跨域的问题
    //     '/api': {
    //         target: "http://ceshi5.dishait.cn/admin/",
    //         changeOrigin: true,
    //         ws: false,
    //         pathRewrite: {
    //             '^/api': ''
    //         }
    //     }
    // },
    //     before: (app) => {}


    configureWebpack: config => {
      const plugins = [];
      if (isProduction) {
        plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              output: {
                comments: false, // 去掉注释
              },
              warnings: false,
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log']//移除console
              }
            }
          })
        )
      }
      // 为生产环境修改配置...
      if (isProduction) {
        // externals
        config.externals = externals
      }
    },
  },

  // 第三方插件配置
  pluginOptions: {

  }
}