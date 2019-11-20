<template>
  <div class="home">
    <TodoInput @createTodo="createTodo"/>
    <!-- <h1>Todos</h1> -->
    <TodoList v-bind:todos="todos"/>
  </div>
</template>

<script>
import router from '../router'
import TodoList from '../components/TodoList.vue'
import TodoInput from '@/components/TodoInput.vue' // @는 src
// import jwtDecode from 'jwt-decode' // vuex에서 번역작업을 거쳐서 온다.
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    TodoList,
    TodoInput,
  },
  data: function(){
    return {
      todos: []
    }
  },
  computed:{
    // 구조를 분해하는 문법
    ...mapGetters([
      'isAuthenticated',
      'requestHeader',
      'userId',
    ])
  },
  methods: {
    checkLoggedIn(){
      // Session Storage에 token이 있으면 login 된 상태
      this.$session.start() // session 시작
      // session에 jwt가 없으면
      // if (!this.$session.has('jwt')){
      if (!this.isAuthenticated){
        // 로그인 페이지로 redirect
        router.push('/login')
      }
    },
    getTodos(){
      // // console.log("사용자의 todo목록 가져오기")
      // this.$session.start()
      // const token = this.$session.get('jwt')
      // const decodedToken = jwtDecode(token)
      // // console.log(decodedToken)
      // const user_id = decodedToken.user_id

      // const requestHeader = {
      //   // headers 안에 적어줘야 한다.
      //   headers: {
      //     Authorization: "JWT " + token
      //   }
      // }
    
      axios.get(`http://localhost:8000/api/v1/users/${this.userId}/`, this.requestHeader)
      .then((res)=>{
        // console.log(res)
        this.todos = res.data.todo_set // vue devtools의 Home에서 확인할 수 있다.
      })
      .catch((error)=>{
        console.log(error)
      })
    },
    createTodo(title){
      // // getTodos에서 복사하였다.
      // this.$session.start()
      // const token = this.$session.get('jwt')
      // const decodedToken = jwtDecode(token)
      // const user_id = decodedToken.user_id

      // const requestHeader = {
      //   headers: {
      //     Authorization: "JWT " + token
      //   }
      // }

      // axios가 요청을 보낼 때, 일반적으로 key와 value로 된 table을 보낸다.
      // 표의 규격을 만들어 준 것이다.
      const requestForm = new FormData()
      requestForm.append('user', this.userId)
      requestForm.append('title', title)
      
      axios.post('http://localhost:8000/api/v1/todos/', requestForm, this.requestHeader)
      .then((res)=>{
        console.log(res)
        this.todos.push(res.data) // 데이터가 화면에서 바로 추가되도록 구성한다.
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  },
  // checkLoggedIn 함수를 실행한다.
  mounted: function(){
    this.checkLoggedIn() // 로그인 되었는지 확인
    this.getTodos()
  }
}
</script>

<style>

</style>