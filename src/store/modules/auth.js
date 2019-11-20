// forms.py
// -----------------------
// class TodoForm(forms.ModelForm):
//   pass
// -----------------------

// views.py
// -----------------------
// from .forms import TodoForm
// -----------------------

import jwtDecode from 'jwt-decode'

// 변수로 만들어준다.
const state = {
  token: null,
}

const mutations = {
  // 사용자가 로그인을 하면 token을 저장해준다.
  setToken: function(state, token){
    state.token = token
  }
}

const actions = {
  login: function(options, token){
    options.commit('setToken', token)
  },
  logout: function(options){
    options.commit('setToken', null)
  },
}

// state에 들어있는 정보를 수정하지 않는 선에서 가져온다.
// computed 속성과 비슷하다.
const getters = {
  isAuthenticated: function(state){
    // token값이 있으면 true를 반환하고 없으면 false를 반환한다.
    return state.token ? true: false
    // if (state.token) {
    //   return true
    // }
    // else {
    //   return false
    // }
  },
  requestHeader: function(){
    return {
      headers: {
        Authorization: "JWT " + state.token
      }
    }
  },
  userId: function(state){
    return state.token ? jwtDecode(state.token).user_id : null
    // // 로그인하지 않았는데 디코딩하려고 하면 에러가 난다.
    // return jwtDecode(state.token).user_id
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}