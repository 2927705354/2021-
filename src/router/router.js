export default([
  {
    path:'/hh/index',
    name:'index',
    component:() => import('@/views/hh/index')
  },
  {
    path:'/test/test',
    name:'test',
    component:() => import('@/views/test/test')
  },
  {
    path:'/hh/login',
    name:'login',
    component:() => import('@/views/hh/login')
  }

])
