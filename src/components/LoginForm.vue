<template>
  <div>
    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <!-- template에는 하나의 요소만 필요 -->
    <div v-else class="login-div col-6 offset-3">
      <div v-if="errors.length" class="error-list alert alert-danger">
        <!-- idx는 for문을 돌았을 때의 idx를 말한다. -->
        <!-- 에러 목록 -->
        <div v-for="(error, idx) in errors" :key="idx">{{error}}</div>
      </div>
      <div class="form-group">
        <label for="id">ID</label>
        <input
        id="id"
        class="form-control"
        type="text"
        v-model="credential.username"
        >
      </div>
      <div class="form-group">
        <label for="password">PASSWORD</label>
        <input
        id="password"
        class="form-control"
        type="password"
        v-model="credential.password"
        >
      </div>
      <button class="btn btn-primary" @click="login">로그인</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router' // index.js가 불러와진다.

export default {
  data: function (){
    return {
      credential: {
        // django에서는 id가 username이다.
        username: '',
        password: ''
      },
      loading: false,
      errors: [],
    }
  },
  methods: {
    login(){
      if (this.checkForm()){
        console.log('로그인 시도!!!')
        // Django 서버로 요청을 보내야 한다. token 값도 가져와야 한다.
        axios.post('http://localhost:8000/api-token-auth/', this.credential) // object 자체를 넘겨준다.
        .then((res)=>{
          this.loading = true
          
          // console.log(res) // res를 출력하면 data의 안에 token 값이 있는 것을 확인할 수 있다.
          res.data.token

          // this.$session.start()
          // this.$session.set('jwt', res.data.token) // 저장을 한다.

          this.$store.dispatch('login', res.data.token) // auth.js의 actions의 login을 말한다.

          // redirect 기능을 해준다.
          router.push('/') // root 주소(Home.vue)로 밀어준다.
        })
        .catch((error)=>{
          this.loading = true
          console.log(error)
        })
      }
    },
    // validation 만들기. login 할 때 사용한다.
    // django처럼 validation을 할 때 vue library도 적용 가능하다.
    checkForm(){
      this.errors = []
      // 비밀번호 길이가 8보다 작을 경우
      if (this.credential.password.length < 8) {this.errors.push("비밀번호는 8글자가 넘어야합니다.")}
      // 아이디를 적지 않은 경우
      if (!this.credential.username) {this.errors.push("아이디를 입력해주세요.")}
      console.log(this.errors)
      // 데이터가 정상적으로 들어왔다면
      if (this.errors.length === 0) {
        return true
      }
    }
  }
}
</script>

<style>

</style>