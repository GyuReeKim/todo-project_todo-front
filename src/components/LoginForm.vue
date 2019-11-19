<template>
  <div>
    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <!-- template에는 하나의 요소만 필요 -->
    <div v-else class="login-div col-6 offset-3">
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
      loading: false
    }
  },
  methods: {
    login(){
      console.log('로그인 시도!!!')
      // Django 서버로 요청을 보내야 한다. token 값도 가져와야 한다.
      axios.post('http://localhost:8000/api-token-auth/', this.credential) // object 자체를 넘겨준다.
        .then((res)=>{
          this.loading = true
          
          // console.log(res) // res를 출력하면 data의 안에 token 값이 있는 것을 확인할 수 있다.
          res.data.token

          this.$session.start()
          this.$session.set('jwt', res.data.token) // 저장을 한다.

          // redirect 기능을 한다.
          router.push('/') // root 주소(Home.vue)로 밀어준다.
        })
        .catch((error)=>{
          this.loading = true
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>