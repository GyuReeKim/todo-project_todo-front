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
          console.log(res)
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