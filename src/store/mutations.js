export default {
  changeCurrentList(state, uid) {
    if (state.listOnModal !== 0) {
      return;
    }
    state.currentList = uid;
  },
  addList(state) {
    if (state.listOnModal !== 0) {
      return;
    }
    state.currentUid++;
    state.lists.push({
      uid: state.currentUid,
      name: "New List",
      color: "blue",
      icon: "tray",
    });
    state.listOnModal = state.currentUid;
  },
  editList(state, uid) {
    state.listOnModal = uid;
  },
  closeEditList(state) {
    state.listOnModal = 0;
  },
  deleteList(state, uid) {
    if (uid == state.currentList) {
      state.currentList = 1;
    }
    state.lists = state.lists.filter((list) => list.uid !== uid);
  },
  updateListName(state, payload) {
    state.lists = state.lists.filter((list) => {
      if (list.uid == payload.uid) {
        list.name = payload.name;
      }
      return list;
    });
  },
  changeCurrentTodo(state, uid) {
    if (state.listOnModal !== 0) {
      return;
    }
    state.currentActiveTodo = 0;
    state.currentTodo = uid;
  },
  changeCurrentActiveTodo(state, uid) {
    if (state.listOnModal !== 0) {
      return;
    }
    if (state.currentTodo == uid) {
      return;
    }
    state.currentActiveTodo = uid;
    state.currentTodo = 0;
  },
  changeTodoCompetedStatus(state, uid) {
    state.todos = state.todos.map((todo) => {
      if (todo.uid == uid) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
  },
  initNewTodo(state, payload) {
    state.todos.push({
      uid: -1,
      content: "",
      date: payload.date !== undefined ? payload.date : 0,
      list: payload.list !== undefined ? payload.list : 0,
      note: "",
      completed: false,
      flagged: payload.flagged === true ? true : false,
      priority: "",
    });
  },
  showAddTodo(state, listUid) {
    if (state.showNewTodo === false && state.search.keyword === "") {
      if (listUid == 1 || listUid == 2) {
        // today and scheduled
        this.commit("initNewTodo", {
          date: new Date().getTime(),
        });
      } else if (listUid == 4) {
        // flagged
        this.commit("initNewTodo", {
          falgged: true,
        });
      } else {
        this.commit("initNewTodo", {
          list: listUid,
        });
      }
      state.showNewTodo = true;
    }
  },
  saveNewTodo(state) {
    let newTodo = state.todos.find((todo) => todo.uid === -1);
    if (newTodo != null) {
      if (newTodo.content !== "") {
        state.currentUid++;
        state.todos = state.todos.filter((todo) => {
          if (todo.uid === -1) {
            todo.uid = state.currentUid;
          }
          return todo;
        });
      } else {
        state.todos = state.todos.filter((todo) => todo.uid !== -1);
      }
      this.commit("changeCurrentTodo", 0);
    }
  },
  blurTodo(state) {
    state.showNewTodo = false;
    this.commit("changeCurrentTodo", 0);
    this.commit("changeCurrentActiveTodo", 0);
    this.commit("saveNewTodo");
  },
  changeTodoFlaggedStatus(state, uid) {
    if (state.currentTodo === -1) {
      state.todos = state.todos.filter((todo) => {
        if (todo.uid === -1) {
          todo.flagged = !todo.flagged;
        }
        return todo;
      });
    } else {
      state.todos = state.todos.filter((todo) => {
        if (todo.uid == uid) {
          todo.flagged = !todo.flagged;
        }
        return todo;
      });
    }
  },
  deleteTodo(state, uid) {
    state.todos = state.todos.filter((todo) => todo.uid !== uid);
  },
  changeTodoDate(state, payload) {
    state.todos = state.todos.filter((todo) => {
      if (todo.uid === payload.uid) {
        todo.date = payload.date;
      }
      return todo;
    });
  },
  searchTodos: (state) => {
    let keyword = state.search.keyword.toLowerCase();
    if (keyword === "") {
      return [];
    }
    state.search.result = state.todos.filter((todo) => {
      if (
        todo.content.toLowerCase().includes(keyword) ||
        todo.note.toLowerCase().includes(keyword)
      ) {
        return todo;
      }
    });
  },
};
