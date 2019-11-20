<template>
  <div>
    <h1>todo</h1>
    <!-- <li v-for="todo in todos" :key="todo.id">{{todo.title}}</li> -->
    <div class="card my-2" v-for="todo in todos" :key="todo.id">
      <div class="card-body d-flex justify-content-between">
        <span @click="updateTodo(todo)" :class="{completed: todo.completed}">{{todo.title}}</span>
        <!-- https://emojipedia.org/wastebasket/ -->
        <span @click="deleteTodo(todo)">🗑️</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import jwtDecode from 'jwt-decode'

export default {
  name: 'TodoList',
  // data: function(){
  //   return {
  //     todos: []
  //   }
  // }
  props: {
    todos: Array,
  },
  computed: {
    requestHeader: function(){
      // store의 header가 바뀌면 나머지도 바뀐다.
      return this.$store.getters.requestHeader
    },
    userId: function(){
      return this.$store.getters.userId
    }
  },
  methods: {
    deleteTodo: function(todo){
      // this.$session.start()
      // const token = this.$session.get('jwt')
      // const requestHeader = {
      //   headers: {
      //     Authorization: "JWT " + token
      //   }
      // }
      // requestHeader를 위에서 가져온다.

      axios.delete(`http://localhost:8000/api/v1/todos/${todo.id}/`, this.requestHeader)
      .then((res)=>{
        console.log(res)
        const targetTodo = this.todos.find(function(el){
          return el === todo
        })
        
        const idx = this.todos.indexOf(targetTodo)

        if (idx > -1) {
          this.todos.splice(idx, 1)
        }
      })
      .catch((error)=>{
        console.log(error)
      })
    },
    updateTodo(todo) {
      // this.$session.start()
      // const token = this.$session.get('jwt')
      // const decodedToken = jwtDecode(token)
      // const user_id = decodedToken.user_id

      // const requestHeader = {
      //   headers: {
      //     Authorization: "JWT " + token
      //   }
      // }

      const requestForm = new FormData()
      requestForm.append('user', this.userId)
      requestForm.append('title', todo.title)
      requestForm.append('completed', !todo.completed)

      axios.put(`http://localhost:8000/api/v1/todos/${todo.id}/`, requestForm, this.requestHeader)
      .then((res)=>{
        console.log(res)
        todo.completed = !todo.completed
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  }
}
</script>

<style>
.completed {
  text-decoration: line-through;
  color: dimgrey
}
</style>