import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
//引入持久化插件
import vuexPersist from "vuex-persist";
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  },
  //初试化配置：
  plugins: [
    new vuexPersist({
      storage: window.localStorage,
    }).plugin,
  ],
})
