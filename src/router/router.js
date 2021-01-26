export default([
  {
    path:'/test/test',
    name:'test',
    component:() => import('@/views/test/test')
  },
  {
    path:'/hh/login',
    name:'login',
    component:() => import('@/views/hh/login')
  },
  {
    path:'/hh/index',
    name:'index',
    component:() => import('@/views/hh/index'),
    redirect: '/hh/wel',
    children:[
      {
        path:'/hh/wel',
        name:'wel',
        component:() => import('@/views/hh/wel')
      },
      {
        path:'/hh/goods',
        name:'goods',
        component:() => import('@/views/hh/goods')
      },
      {
        path:'/hh/cate',
        name:'cate',
        component:() => import('@/views/hh/cate')
      },
      {
        path:'/hh/list',
        name:'list',
        component:() => import('@/views/hh/list')
      },
    ]
  },

])
