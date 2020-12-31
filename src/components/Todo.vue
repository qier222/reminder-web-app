<template>
  <div
    class="todo"
    :style="{
      '--color': color,
      background: active ? '#ebebeb' : '',
    }"
    @click="changeCurrentActiveTodo(source.uid)"
    @mouseenter="showDeleteButton = true"
    @mouseleave="showDeleteButton = false"
  >
    <div
      @click.stop="changeTodoCompetedStatus(source.uid)"
      class="complete-button"
      :class="{ completed: source.completed }"
    ></div>
    <div class="content">
      <div class="text">
        <span
          class="priority"
          v-if="source.priority != ''"
          :style="{ color: todoPriorityColor }"
          >{{ source.priority }}</span
        >
        <input
          type="text"
          v-model="source.content"
          v-focus="source.uid === -1"
          @click.stop=""
          v-on:keyup.enter="blurTodo"
          @focus="changeCurrentTodo(source.uid)"
          :style="{
            color: source.completed && editing === false ? '#808080' : '',
          }"
        />
        <div class="float-right">
          <span v-if="source.flagged" class="icon icon-flag"></span>
          <span
            v-if="showDeleteButton"
            @click="deleteTodo(source.uid)"
            class="icon icon-minus-circle"
          ></span>
        </div>
      </div>
      <div v-if="source.note != '' || editing === true" class="note">
        <input
          type="text"
          v-model="source.note"
          @click.stop=""
          placeholder="Notes"
          @focus="changeCurrentTodo(source.uid)"
          v-on:keyup.enter="blurTodo"
        />
      </div>
      <div
        v-if="source.date != 0 && editing == false"
        class="date"
        :style="{ color: dateColorRed && !source.completed ? '#ff3b30' : '' }"
      >
        {{ dateString }}
      </div>
      <div v-if="editing" class="editing-options">
        <div class="option editing-date">
          <span
            class="icon icon-calendar"
            :class="{ 'color-bule': dateIconColorBlue }"
          ></span>
          <input
            placeholder="Add Date"
            v-model="dateString"
            @change="updateTodoDate"
            @focus="dateIconColorBlue = true"
            @blur="dateIconColorBlue = false"
            :size="dateString !== '' ? dateString.length : 8"
            v-on:keyup.enter="blurTodo"
          />
          <span class="icon icon-xmark" @click="clearDate"></span>
        </div>
        <div class="option editing-priority">
          <span
            class="icon icon-exclamationmark-square"
            :class="{ 'color-bule': priorityIconColorBlue }"
          ></span>
          <select
            v-model="source.priority"
            :style="{ color: source.priority == '' ? '#878f96' : '' }"
            @focus="priorityIconColorBlue = true"
            @blur="priorityIconColorBlue = false"
          >
            <option value="" disabled selected>Priority</option>
            <option value="">None</option>
            <option value="!">Low</option>
            <option value="!!">Medium</option>
            <option value="!!!">High</option>
          </select>
        </div>
        <div
          class="option editing-flag"
          title="Flag"
          @click="changeTodoFlaggedStatus(source.uid)"
        >
          <span
            class="icon icon-flag"
            :class="{ 'color-bule': source.flagged }"
          ></span>
        </div>
      </div>
    </div>
    <div class="action-button"></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "Todo",
  props: {
    todo: Object,
    color: String,
    index: {
      type: Number,
    },
    source: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data: function() {
    return {
      dateString: "",
      dateStringCopy: "",
      showDeleteButton: false,
      dateColorRed: false,
      dateIconColorBlue: false,
      priorityIconColorBlue: false,
    };
  },
  computed: {
    ...mapState(["currentTodo", "currentActiveTodo", "window"]),
    ...mapGetters(["getColorByListUid"]),
    showInfo: function() {
      return this.source.date !== 0 && this.source.note !== null ? true : false;
    },
    todoBoxHeight: function() {
      let height = 50;
      if (!this.showInfo) {
        height = 33;
      }
      return height;
    },
    editing: function() {
      return this.currentTodo == this.source.uid ? true : false;
    },
    active: function() {
      return this.currentActiveTodo == this.source.uid && this.currentTodo == 0
        ? true
        : false;
    },
    todoPriorityColor: function() {
      if (this.source.list !== 0) {
        return this.getColorByListUid(this.source.list);
      } else {
        return this.color;
      }
    },
  },
  methods: {
    ...mapMutations([
      "changeTodoCompetedStatus",
      "changeCurrentTodo",
      "changeCurrentActiveTodo",
      "changeTodoFlaggedStatus",
      "deleteTodo",
      "changeTodoDate",
      "blurTodo",
    ]),
    updateTodoDate() {
      let date = "";
      if (["Today", "Yesterday", "Tomorrow"].includes(this.dateString)) {
        if (this.dateString == "Today") {
          date = new Date();
        } else if (this.dateString == "Tomorrow") {
          date = new Date(new Date().getTime() + 86400000);
        } else if (this.dateString == "Yesterday") {
          date = new Date(new Date() - 86400000);
        }
      } else if (this.dateString !== "") {
        date = new Date(this.dateString);
        if (date == "Invalid Date") {
          alert("Invalid date.");
          this.dateString = this.dateStringCopy;
          return;
        }
      }
      console.log(this.dateString, date);
      this.changeTodoDate({
        uid: this.source.uid,
        date: this.dateString == "" ? 0 : date.getTime(),
      });
    },
    clearDate() {
      this.dateString = "";
      this.updateTodoDate();
    },
  },
  created: function() {
    if (this.source.date !== 0) {
      let now = new Date();
      let todoDate = new Date(this.source.date);
      let isToday =
        now.toDateString() == todoDate.toDateString() ? true : false;
      let isYestoday =
        new Date(now - 86400000).toDateString() == todoDate.toDateString()
          ? true
          : false;
      let isTomorrow =
        now.toDateString() == new Date(todoDate - 86400000).toDateString()
          ? true
          : false;
      if (isToday) {
        this.dateString = "Today";
      } else if (isYestoday) {
        this.dateString = "Yesterday";
      } else if (isTomorrow) {
        this.dateString = "Tomorrow";
      } else {
        this.dateString = todoDate.toLocaleDateString();
      }
      this.dateStringCopy = this.dateString;
      if (now > todoDate && !isToday) {
        this.dateColorRed = true;
      }
    } else {
      this.dateString = "";
    }
  },
  directives: {
    focus: {
      inserted: function(el, binding) {
        if (binding.value) {
          el.focus();
        }
      },
    },
  },
};
</script>

<style scoped>
.todo {
  padding: 8px 18px;
  position: relative;
  box-sizing: border-box;
  user-select: none;
  box-shadow: 50px 1px 0 0px #e6e6e6;
  --color: grey;
  display: flex;
}

.complete-button {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  box-sizing: border-box;
}
.complete-button {
  border: 1px solid #797979;
}
.complete-button.completed {
  border: 1px solid var(--color);
}
.complete-button.completed:after {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--color);
  position: relative;
  top: 3px;
  left: 3px;
}
.content {
  flex: 1;
  margin-left: 13px;
}
input {
  border: none;
  background: none;
  padding: 1px 0;
}
input:focus {
  outline: none;
}
.text {
  margin-top: 1px;
  font-size: 13px;
}
.priority {
  margin-right: 3px;
}
.date {
  margin-top: 1px;
  font-size: 13px;
  color: #868e98;
}
.note {
  margin-bottom: 1px;
}
.note input {
  font-size: 12px;
  color: #868e98;
}
.note input::placeholder {
  color: #c4c4c4;
}
.float-right {
  color: #7f7f7f;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
}
.float-right .icon-minus-circle {
  margin-left: 8px;
  font-size: 15px;
  color: #007aff;
}

.color-bule {
  color: #007aff !important;
}

.editing-options {
  margin-top: 3px;
  display: flex;
}
.editing-options .option {
  min-height: 20px;
  background: #f5f5f5;
  color: #878f96;
  padding: 0px 6px;
  font-size: 13px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
.editing-options .option input {
  margin-left: 5px;
  font-size: 13px;
}
.editing-options .icon-xmark {
  color: #b8b8b8;
  font-size: 12px;
  margin-right: 0px;
}
.editing-options .option select {
  margin-left: 5px;
  border: none;
  appearance: none;
  background: #f5f5f5;
}
.editing-options .option select:focus {
  outline: none;
}
.editing-options .editing-date {
}
</style>
