<template>
  <div class="main">
    <div class="dots">
      <span style="background: #ff5f57"></span>
      <span style="background: #ffbd2e"></span>
      <span style="background: #28ca41"></span>
    </div>
    <div class="search-box">
      <SearchBox />
    </div>
    <div class="filters">
      <ListSp
        class="filter"
        v-for="list in lists.filter((list) => list.special)"
        :key="list.uid"
        :list="list"
      />
    </div>
    <div class="my-lists">
      <div class="label">My Lists</div>
      <div class="lists" style="height:100%">
        <List
          v-for="list in lists.filter((list) => !list.special)"
          :key="list.uid"
          :list="list"
        />
      </div>
    </div>
    <div class="add-list" @click="addList">
      <span class="icon icon-circle-plus"></span>
      <span class="text">Add List</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ListSp from "./ListSp.vue";
import SearchBox from "./SearchBox";
import List from "./List";

export default {
  name: "Main",
  components: {
    ListSp,
    SearchBox,
    List,
  },
  computed: {
    ...mapState(["todos", "lists", "colors"]),
  },
  methods: {
    ...mapMutations(["addList"]),
  },
};
</script>

<style scoped>
.main {
  background: #f6f6f6;
  width: 256px;
  padding: 12px;
}

.dots {
  margin-left: -4px;
  display: flex;
}
.dots span {
  width: 12px;
  height: 12px;
  background: #dddddd;
  border-radius: 50%;
  box-shadow: inset 0 0 1px 0 rgba(44, 47, 51, 0.6);
  margin: 0 4px;
}

.search-box {
  margin-top: 28px;
}
.filters {
  margin-top: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.filter {
  flex: 1;
  margin: 4px;
  user-select: none;
}
.my-lists .label {
  margin: 12px 0 2px 2px;
  font-size: 12px;
  color: #686769;
}
.add-list {
  left: 16px;
  position: absolute;
  bottom: 10px;
  color: #636367;
  user-select: none;
}
.add-list .text {
  position: relative;
  top: -3px;
  left: 8px;
  font-size: 12px;
  font-weight: 500;
}
.add-list:active {
  color: #000;
}
</style>
