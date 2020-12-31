<template>
  <div
    class="list-content"
    :style="{
      width: this.$store.state.window.width - 280 + 'px',
      height: this.$store.state.window.height - 100 + 'px',
    }"
  >
    <div class="add-button-row">
      <div
        class="add-button"
        :class="{ disabled: list.icon === 'search' }"
        @click="showAddTodo(list.uid)"
      >
        <span class="icon icon-plus"></span>
      </div>
    </div>
    <div class="title" :style="{ color: color }" @click="blurTodo">
      <span class="text">{{ list.name }}</span>
      <span v-if="!list.special" class="count">{{ todos.length }}</span>
    </div>

    <div class="todo-content">
      <div v-if="todos.length != 0 || showNewTodo">
        <VirtualList
          style="overflow-y: auto;"
          :style="{
            height: this.$store.state.window.height - 91 + 'px',
            width: this.$store.state.window.width - 280 + 'px',
          }"
          scrollable
          :data-key="'uid'"
          :data-sources="todos"
          :data-component="todoComponent"
          :extra-props="{ color: color }"
        />
        <!-- <div class="todos" v-for="todo in todos" :key="todo.uid">
          <Todo :todo="todo" :color="color" />
        </div> -->
        <!-- <div class="todos new-todo" v-if="showNewTodo">
          <Todo :todo="newTodo" :focusTodo="true" :color="color" />
        </div> -->
      </div>
      <div v-else class="no-reminders">
        No Reminders
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Todo from "./Todo";
import VirtualList from "vue-virtual-scroll-list";

export default {
  name: "ListContent",
  props: {
    list: Object,
    todos: Array,
  },
  data() {
    return {
      todoComponent: Todo,
    };
  },
  components: {
    VirtualList,
  },
  computed: {
    ...mapState(["showNewTodo", "newTodo"]),
    ...mapGetters(["colorStringToHex"]),
    color: function() {
      return this.colorStringToHex(this.list.color);
    },
  },
  methods: {
    ...mapMutations([
      "showAddTodo",
      "changeCurrentActiveTodo",
      "changeCurrentTodo",
      "blurTodo",
    ]),
  },
};
</script>

<style scoped>
.list-content {
  background: #fff;
}

.add-button-row {
  height: 34px;
}
.add-button {
  box-sizing: border-box;
  position: fixed;
  right: 8px;
  top: 8px;
  background: #fff;
  border-radius: 3px;
  height: 20px;
  width: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #000;
  box-shadow: 0 0 1px 0 rgba(44, 47, 51, 0.7),
    0 1px 4px 0 rgba(233, 233, 234, 1);
}
.add-button.disabled .icon {
  color: #cfcfcf !important;
}

.todo-content {
  display: flex;
  height: 100%;
  /* flex-direction: column; */
}
.title {
  font-family: "Nunito", sans-serif;
  font-size: 34px;
  width: 100%;
  margin: 6px 0;
  user-select: none;
}
.title .text {
  font-weight: 800;
  margin-left: 18px;
}
.title .count {
  float: right;
  margin-right: 18px;
}

.no-reminders {
  margin: auto;
  color: #c0c0c0;
  font-family: "Nunito", sans-serif;
  font-size: 34px;
  user-select: none;
  font-weight: 500;
}
</style>
