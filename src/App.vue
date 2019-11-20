<template>
  <div id="app">
    <div id="nav">
      <!-- 로그인 되어있다면 -->
      <div v-if="isAuthenticated">
        <!-- router-link의 역할은 to에 대한 component를 보여주는 것이다. -->
        <router-link to="/">Home</router-link> |
        <!-- logout은 특별히 보여줄 component가 없다. -->
        <!-- prevent는 a태그 기능을 사용하지 않고 이벤트 기능만 활성화한다. -->
        <a href="#" @click.prevent="logout">logout</a>
      </div>
      <!-- 로그인이 되어있지 않다면 -->
      <div v-else>
        <router-link to="/login">login</router-link>
      </div>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function(){
    return {
      // 만들어지는 순간 할당이 되고 바뀌지 않는다.
      // 세션이 바뀌는 것은 computed와 watch는 탐지할 수 없다.
      isAuthenticated: this.$session.has('jwt')
    }
  },
  methods: {
    logout: function(){
      // console.log("로그아웃버튼 눌림")
      this.$session.destroy() // 세션 정보를 전부 날린다.
      this.$router.push('/login') // 로그인페이지로 redirect
    }
  },
  // 일 부분이라도 렌더링이 다시 된다면 함수를 다시 실행한다.
  // logout을 실행시키면서 router를 다른 곳으로 보낸다.
  // App.vue는 최상위 컴포넌트기 때문에 로그인 상태인지 모든 컴포넌트에서 확인할 수 있다.
  updated: function(){
    this.isAuthenticated = this.$session.has('jwt')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
