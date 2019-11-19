<template>
  <div class="todo-input">
    <div class="input-group">
      <input type="text" class="form-control" v-model="title" @keydown.enter="createTodo">
      <span class="input-group-btn">
        <button class="btn btn-primary" @click="createTodo">+</button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoInput',
  data: function(){
    return {
      title: ''
    }
  },
  methods: {
    createTodo: function(){
      this.$emit('createTodo', this.title)
      // 다음 데이터와 충돌하지 않기 위해서 초기화한다.
      this.title = ''
    }
  }
}
</script>

<style>

</style>