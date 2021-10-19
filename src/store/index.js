import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    allTodos: state => state.todos
  },
  mutations: {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter( todo => todo.id  !== id),
    putTodo:(state, upTodo) => {
      const index = state.todos.findIndex(todo => todo.id === upTodo.id)
      if(index !== -1){
        state.todos.splice(index, 1, upTodo)
      }
    }
  },
  actions: {
    async fetchTodos({
      commit
    }) {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
      commit('setTodos', response.data)
      // console.log(response.data)
    },
    async addTodo({
      commit
    }, todo) {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', todo)
      console.log(response.data)
      commit('newTodo', response.data)
    },
    async deleteTodo({
      commit
    }, id){
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      commit('removeTodo', id)
      console.log(`Todo with id : ${id} Deleted`)
    },
    async limitTodos({commit}, limit){
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
      commit('setTodos', response.data)
      console.log(response.data)
    },
    async updateTodo({commit}, updTodo){
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo)
      commit('putTodo', response.data)
      console.log(response.data)
    }
  },
  modules: {}
})