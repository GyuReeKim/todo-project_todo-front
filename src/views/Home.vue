<template>
  <div class="home">
    <h1>Todos</h1>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'home',
  components: {

  },
  methods: {
    checkLoggedIn(){
      // Session Storage에 token이 있으면 login 된 상태
      this.$session.start() // session 시작
      // session에 jwt가 없으면
      if (!this.$session.has('jwt')){
        // 로그인 페이지로 redirect
        router.push('/login')
      }
    }
  },
  // checkLoggedIn 함수를 실행한다.
  mounted: function(){
    this.checkLoggedIn()
  }
}
</script>

<style>

</style>