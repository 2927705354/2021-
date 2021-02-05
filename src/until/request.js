import axios from 'axios'
// import {Loading} from 'element-ui'
// 根据环境引入不同配置 process.env.NODE_ENV
// const config = require('../config/env.' + process.env.NODE_ENV)
// console.log(config.baseUrl)
const Server=axios.create({
  baseURL:'api',
  // baseURL:config.baseUrl,
  timeout:5000
})

// let loading;
Server.interceptors.request.use(config => {
  // loadig加载
  // loading = Loading.service({
  //   lock: true,
  //   text: 'Loading',
  //   spinner: 'el-icon-loading',
  //   background: 'rgba(0, 0, 0, 0.7)',
  // });
  // console.log(config)
  return config
})

Server.interceptors.response.use(res => {
  // loading.close()
  return res.data
})

export default Server;