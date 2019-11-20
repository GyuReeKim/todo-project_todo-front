import Vue from 'vue'
import Vuex from 'vuex' // vuex는 상태들을 관리해주는 역할을 한다.
import auth from './modules/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // vue에서 data
  state: {
  },
  // vue에서 methods
  mutations: {
  },
  // vue에서 methods들을 묶어놓음 (비동기적으로 처리)
  actions: {
  },
  // component 처럼 분리할 때
  modules: {
    auth,
  }
})
