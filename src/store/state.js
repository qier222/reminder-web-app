export default {
    window: {
        height: 1000,
        width: 1000,
    },
    currentUid: 9,
    currentList: 1,
    currentTodo: 0,
    currentActiveTodo: 0,
    listOnModal: 0,
    showNewTodo: false,
    newTodo: null,
    search: {
        keyword: '',
        result: [],
    },
    todos: [{
        uid: 5,
        content: "Buy new Macbook Pro",
        date: 1597766400000,
        list: 8,
        note: "ARM CHIP!!!",
        completed: true,
        flagged: false,
        priority: "!!!"
    }, {
        uid: 6,
        content: "Fix joy-con stick",
        date: 1597854312498,
        list: 0,
        note: "",
        completed: false,
        flagged: true,
        priority: ""
    }, {
        uid: 7,
        content: "Buy another HomePod",
        date: 1597854312498,
        list: 8,
        note: "",
        completed: false,
        flagged: false,
        priority: ""
    }],
    lists: [{
        uid: 1,
        name: "Today",
        color: "blue",
        icon: "calendar",
        special: true
    }, {
        uid: 2,
        name: "Scheduled",
        color: "orange",
        icon: "clock",
        special: true
    }, {
        uid: 3,
        name: "All",
        color: "grey",
        icon: "tray",
        special: true
    }, {
        uid: 4,
        name: "Flagged",
        color: "red",
        icon: "flag",
        special: true
    }, {
        uid: 8,
        name: "Shopping",
        color: "yellow",
        icon: "tray",
        special: false
    }, {
        uid: 9,
        name: "Others",
        color: "purple",
        icon: "clock",
        special: false
    }],
    colors: {
        red: "#ff3b30",
        orange: "#ff9500",
        yellow: "#ffcc00",
        green: "#19c759",
        lightBlue: "#51aaf2",
        blue: "#007aff",
        indigo: "#5856d6",
        fuchsia: "#ea426a",
        purple: "#c077db",
        brown: "#9d8563",
        grey: "#5b6770",
        pink: "#d9a69f",
    }
}