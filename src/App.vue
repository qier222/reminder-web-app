<template>
  <div
    id="app"
    :style="{ height: window.height + 'px', width: window.width + 'px' }"
  >
    <div
      class="main"
      @click="blurTodo"
      :style="{ height: window.height + 'px' }"
    >
      <Main />
    </div>
    <div class="list-content">
      <ListContent
        v-if="search.keyword === ''"
        :list="getCurrentListContent.list"
        :todos="getCurrentListContent.todos"
      />
      <ListContent
        v-if="search.keyword !== ''"
        :list="searchResult.list"
        :todos="searchResult.todos"
      />
    </div>
    <div v-if="listOnModal !== 0" class="new-list-modal">
      <EditList />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Main from "./components/Main.vue";
import ListContent from "./components/ListContent.vue";
import EditList from "./components/EditList";

export default {
  name: "App",
  components: {
    Main,
    ListContent,
    EditList,
  },
  mounted: function() {
    this.window.height = window.innerHeight - 1;
    this.window.width = window.innerWidth - 1;
    window.onresize = () => {
      return (() => {
        this.window.height = window.innerHeight - 1;
        this.window.width = window.innerWidth - 1;
      })();
    };
  },
  computed: {
    ...mapState([
      "window",
      "currentList",
      "colors",
      "listOnModal",
      "search",
      "window",
    ]),
    ...mapGetters(["getCurrentListContent"]),
    searchResult: function() {
      return {
        list: {
          uid: -1,
          name: 'Results for "' + this.search.keyword + '"',
          color: "grey",
          icon: "search",
          special: true,
        },
        todos: this.search.result,
      };
    },
  },
  methods: {
    ...mapMutations(["blurTodo"]),
  },
};
</script>

<style>
@import url("./assets/css/style.css");
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&display=swap");

#app {
  font-family: -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial,
    sans-serif;
  box-sizing: border-box;
  user-select: none;
  display: flex;
}

.main {
  width: 280px;
  border-right: 1px solid #dadada;
  background: #f6f6f6;
}

.list-content {
  flex: 1;
}
</style>
