import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AuthLogin from '../views/AuthLogin.vue'
import Vuex from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: AuthLogin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = window.localStorage.getItem('project-manager-user')
  if (to.name !== 'Login' && !user) {
    next({name: 'Login'})
  } 
  Vuex.state.user = JSON.parse(user)
  next()
})

export default router
