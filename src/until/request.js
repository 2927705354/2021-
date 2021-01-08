import axios from 'axios'

const Server=axios.create({
  baseURL:'',
  timeout:5000
})

Server.interceptors.request.use(config=>{
  return config
})

Server.interceptors.response.use(res=>{
  return res.data
})

export default Server;