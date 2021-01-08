import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 按需引入element-ui
import 'element-ui/lib/theme-chalk/index.css';
import element from '@/element';
Vue.use(element)

// 引入接口
import axios from '@/until/api'
Vue.prototype.$axios=axios

// echarts引入
import echarts from 'echarts'
Vue.prototype.$echarts=echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
