import Vue from 'vue'
import App from './App.vue' // 추가
import router from './router' // 추가
import VueSession from 'vue-session'

Vue.config.productionTip = false

Vue.use(VueSession) // 개발자도구의 Application 안에있는 Session Storage를 사용할 수 있도록 도와준다.

new Vue({
  router, // 추가
  render: h => h(App)
}).$mount('#app')
