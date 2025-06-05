<template>
  <div id="app">
    <div class="section">
      <div class="container">
        <TodoList
          :todos="todos"
          @addTodo="addTodo"
          @onComplete="complete"
          @deleteTodo="deleteTodo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "bulma/css/bulma.css";
import TodoList from "./components/TodoList.vue";

import { db } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export default {
  name: "App",
  components: {
    TodoList,
  },
  data() {
    return {
      todos: [],
    };
  },
  created() {
    // Real-time subscription to todos collection, ordered by creation time
    const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
    this.unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ id: doc.id, ...doc.data() });
      });
      this.todos = todosArray;
    });
  },
  beforeUnmount() {
    // Clean up listener when component unmounts
    if (this.unsubscribe) this.unsubscribe();
  },
  methods: {
    async addTodo(todo) {
      try {
        await addDoc(collection(db, "todos"), {
          title: todo.title,
          completed: false,
          createdAt: new Date(),
        });
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },
    async complete(id) {
      try {
        const todoRef = doc(db, "todos", id);
        const todo = this.todos.find((t) => t.id === id);
        if (todo) {
          await updateDoc(todoRef, {
            completed: !todo.completed,
          });
        }
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    },
    async deleteTodo(id) {
      try {
        await deleteDoc(doc(db, "todos", id));
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
  },
};
</script>

<style>
#app {
  background-color: rgb(222, 199, 135);
}
</style>
