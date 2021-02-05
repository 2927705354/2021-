// const path = require('path')

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';

//骨架屏渲染
// const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')


// 本地环境是否需要使用cdn
const devNeedCdn = false

// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    'marked': 'marked',
    'highlight.js': 'hljs',
    'nprogress': 'NProgress',
    'axios': 'axios'
  },
  // cdn的css链接
  css: [
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
    'https://cdn.jsdelivr.net/npm/vant@2.12/lib/index.css'
  ],
  // cdn的js链接
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
    'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
    'https://unpkg.com/element-ui/lib/index.js',
    'https://cdn.jsdelivr.net/npm/vant@2.12/lib/vant.min.js'
  ]
}

module.exports = {
  // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: 'warning',
  // 是否使用包含运行时编译器的 Vue 构建版本
  // runtimeCompiler: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  // integrity: false,
  // // webpack相关配置
  // chainWebpack: (config) => {
  //     config.resolve.alias
  //         .set('vue$', 'vue/dist/vue.esm.js')
  //         .set('@', path.resolve(__dirname, './src'))
  // },
  // configureWebpack: (config) => {
  //     if (process.env.NODE_ENV === 'production') {
  //         // 生产环境
  //         config.mode = 'production'
  //     } else {
  //         // 开发环境
  //         config.mode = 'development'
  //     }
  // },
  // // css相关配置
  // //   css: {
  // //     // 是否分离css（插件ExtractTextPlugin）
  // //     extract: true,
  // //     // 是否开启 CSS source maps
  // //     sourceMap: false,
  // //     // css预设器配置项
  // //     loaderOptions: {},
  // //     // 是否启用 CSS modules for all css / pre-processor files.
  // //     modules: false
  // //   },
  // // 是否使用 thread-loader
  // // parallel: require('os').cpus().length > 1,
  // // PWA 插件相关配置
  // // pwa: {},
  // // webpack-dev-server 相关配置
  devServer: {
  //     // open: true,
  //     // host: 'localhost',
  //     // port: 8080,
  //     // https: false,
  //     // hotOnly: false,
  //     // // http 代理配置
    proxy: {
      // 以api开头的域名解决跨域的问题
      '/api': {
        target: "http://admintest.happymmall.com/",
        changeOrigin: true,
        ws:false,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  // //     before: (app) => {}
  },
  // // 第三方插件配置
  // pluginOptions: {

  // }


  chainWebpack: config => {
    // ============注入cdn start============
    config.plugin('html').tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction || devNeedCdn) args[0].cdn = cdn
      return args
    })
    // ============注入cdn start============
  },
  configureWebpack: config => {
    // 用cdn方式引入，则构建时要忽略相关资源
    if (isProduction || devNeedCdn) config.externals = cdn.externals
    // 代码压缩
    //在configureWebpack中加入
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
    // 代码压缩
    config.plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          //生产环境自动删除console
          compress: {
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ['console.log']
          }
        },
        sourceMap: false,
        parallel: true
      })
    )

    // 公共代码抽离
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: /node_modules/,
            name: 'vendor',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100
          },
          common: {
            chunks: 'all',
            test: /[\\/]src[\\/]js[\\/]/,
            name: 'common',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          },
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true
          },
          runtimeChunk: {
            name: 'manifest'
          }
        }
      }
    }

    // 骨架屏渲染
    // config.plugins.push(new SkeletonWebpackPlugin({
    //   webpackConfig: {
    //     entry: {
    //       app: path.join(__dirname, './src/Skeleton/index.js'),
    //     },
    //   },
    //   minimize: true,
    //   quiet: true,
    //   // 如果不设置那么所有的路由都会共享这个骨架屏组件
    //   router: {
    //     mode: 'hash',
    //     // 给对应的路由设置对应的骨架屏组件，skeletonId的值根据组件设置的id
    //     routes: [
    //       { path: '/hh/home', skeletonId: 'home' }
    //       // { path: '/kc', skeletonId: 'list' },
    //     ]
    //   }
    // }))
  }

}