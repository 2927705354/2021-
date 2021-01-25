import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 按需引入element-ui  element-ui
import 'element-ui/lib/theme-chalk/index.css';
import element from '@/element';
Vue.use(element)

// 引入vant-ui  vant
// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);
// 引入接口
import axios from '@/until/api'
Vue.prototype.$axios=axios

// echarts引入 echarts@4.9.0
// import echarts from 'echarts'
// Vue.prototype.$echarts=echarts

// 移动端rem适配  cnpm install lib-flexible postcss-pxtorem --save-dev
// import 'lib-flexible/flexible';

// vuex数据持久化 cnpm i vuex-persist -D
// Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
