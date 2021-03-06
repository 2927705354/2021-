import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import route from './router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/hh/login'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // {
  //   path:'/hh/index',
  //   name:'index',
  //   component:()=>import('@/views/hh/index')
  // }
  ...route
]

const router = new VueRouter({
  routes
})

export default router
