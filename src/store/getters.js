export default {
    colorStringToHex: (state) => (color) => {
        return state.colors[color];
    },
    getListByUid: (state) => (uid) => {
        return state.lists.find(list => list.uid === uid);
    },
    getTodosByList: (state, getters) => (uid) => {
        let list = getters.getListByUid(uid);
        if (list.special) {
            if (list.name == 'Today') {
                let now = new Date();
                return state.todos.filter(todo => {
                    if (todo.date === 0) {
                        return false;
                    }
                    let todoDate = new Date(todo.date)
                    let isToday = now.toDateString() == todoDate.toDateString();
                    if (isToday) {
                        return true;
                    }
                    if (now > todoDate && !isToday && !todo.completed) {
                        return true;
                    }
                    return false;
                })
            } else if (list.name == 'Scheduled') {
                return state.todos.filter(todo => todo.date !== 0);
            } else if (list.name == 'All') {
                return state.todos;
            } else if (list.name == 'Flagged') {
                return state.todos.filter(todo => todo.flagged);
            }
        } else {
            return state.todos.filter(todo => todo.list === uid);
        }
    },
    getCurrentListContent: (state, getters) => {
        let result = {
            list: getters.getListByUid(state.currentList),
            todos: getters.getTodosByList(state.currentList)
        }
        result.todos.sort(function (todoA, todoB) {
            if (todoA.completed === true && todoB.completed === false) {
                return 1;
            } else if (todoA.completed === false && todoB.completed === true) {
                return -1;
            } else {
                return 0;
            }
        });
        return result;
    },
    countTodosByList: (state, getters) => (uid) => {
        return getters.getTodosByList(uid).length
    },
    getColorByListUid: (state) => (uid) => {
        return state.colors[state.lists.find(list => list.uid === uid).color];
    },
}