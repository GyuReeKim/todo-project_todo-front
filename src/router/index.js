import Vue from 'vue'
import VueRouter from 'vue-router' // 추가
import Home from '../views/Home.vue' // 추가
import Login from '../views/Login.vue' // Login 불러오기

Vue.use(VueRouter)

const routes = [
  {
    path: '/', // 어떤 경로를 불러올지
    name: 'home',
    component: Home // 어떤 이름으로 불러올지
  },
  // Login 컴포넌트 등록
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
