<template>
  <v-container>
    <v-row>
      <v-col>
        <p class="font-weight-bold">List Todos</p>
      </v-col>
      <v-col>
        <v-form>
          <v-text-field outlined color="green accent-4" label="Title" v-model="title"></v-text-field>
        </v-form>
        <v-btn large color="green accent-4" class="float-right white--text" @click="submitTodo">
          <v-icon left> mdi-plus </v-icon>
          <span>Add Todo</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p>Limit Results</p>
        <v-select :items="limit_item" v-model="limit" @change="handleLimit"></v-select>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col
        cols="12"
        md="6"
        lg="3"
        xl="3"
        v-for="(todo, i) in allTodos"
        :key="i"
      >
        <v-alert
          border="left"
          colored-border
          :color="giveColor(todo.completed)"
          elevation="2"
          class="pa-0"
          @dblclick="handleUpdate(todo)"
        >
          <v-card elevation="0">
            <v-card-title class="d-flex justify-center">
              <p class="text-center">{{ todo.title }}</p>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <span>ID : {{todo.id}}</span>
              <v-btn icon color="warning" @click="handleDelete(todo.id)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  data(){
    return{
      title: null,
      limit_item: [200, 100, 50, 10, 5],
      limit: null,
    }
  },
  computed: {
    ...mapGetters(["allTodos"]),
  },
  methods: {
    ...mapActions(["fetchTodos", "addTodo", "deleteTodo", "limitTodos", "updateTodo"]),
    submitTodo(){
      let data = {
        title: this.title,
        completed: false
      }
      this.addTodo(data)
      console.log(data)
    },
    handleDelete(id){
      this.deleteTodo(id)
    },
    handleLimit(){
      let val = this.limit
      console.log(val)
      this.limitTodos(val)
    },
    handleUpdate(item){
      const data = {
        id: item.id,
        title: item.title,
        completed: !item.completed
      }
      this.updateTodo(data)
      // console.log(item)
    },
    giveColor(completed){
      if(!completed){
        // console.log('false')
        return "red accent-3"
      } else {
        // console.log('true')
        return "green accent-3"
      }
    }
  },
  components: {},
  created() {
    this.fetchTodos();
  },
};
</script>
