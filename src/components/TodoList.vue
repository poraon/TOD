<template>
  <div class="columns is-multiline">
    <div class="column is-6 is-offset-3">
      <form @submit.prevent="onSubmit">
        <div class="field">
          <label class="label">Add Your Task</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Enter your Todo task"
              v-model="title"
            />
          </div>
        </div>
      </form>
    </div>

    <div class="column is-6 is-offset-3" v-for="todo in todos" :key="todo.id">
      <div class="box todo_box" @click="$emit('onComplete', todo.id)">
        <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        <button
          class="button is-danger is-small is-pulled-right"
          v-if="todo.completed"
          @click.stop="$emit('deleteTodo', todo.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import shortid from "shortid";
export default {
  name: "TodoList",
  props: ["todos"],
  data() {
    return {
      title: "",
    };
  },
  methods: {
    onSubmit() {
      if (!this.title.trim()) {
        alert("Task title cannot be empty");
        return;
      }
      const new_todo = {
        title: this.title,
        completed: false,
        id: shortid.generate(),
      };

      this.$emit("addTodo", new_todo);
      this.title = "";
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: rgb(197, 200, 201);
}
.todo_box {
  transition: all 0.3s;
}
.todo_box:hover {
  cursor: pointer;
  background-color: rgb(204, 49, 28);
  transform: scale(1.1);
}
.label {
  font-size: 1.5rem;
  color: rgb(0, 0, 0);
}
</style>