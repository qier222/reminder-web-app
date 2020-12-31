<template>
  <div
    class="filter"
    :class="{ active: active }"
    :style="filterBackgroundColor"
    @click="changeCurrentList(list.uid)"
  >
    <span class="count">{{ count }}</span>
    <span class="icon-container" :style="iconColor">
      <span :class="'icon icon-' + list.icon"></span>
    </span>
    <span class="title">{{ list.name }}</span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ListSp",
  props: {
    list: Object,
  },
  computed: {
    ...mapGetters(["colorStringToHex", "countTodosByList"]),
    color: function() {
      return this.colorStringToHex(this.list.color);
    },
    count: function() {
      return this.countTodosByList(this.list.uid);
    },
    active: function() {
      return this.list.uid == this.$store.state.currentList ? true : false;
    },
    filterBackgroundColor: function() {
      return {
        background: this.active ? this.color : "#dedede",
      };
    },
    iconColor: function() {
      return {
        background: this.active ? "#fff" : this.color,
        color: this.active ? this.color : "#fff",
      };
    },
  },
  methods: {
    ...mapMutations(["changeCurrentList"]),
  },
};
</script>

<style scoped>
.filter {
  height: 60px;
  min-width: 120px;
  border-radius: 10px;
  padding: 8px;
  box-sizing: border-box;
  position: relative;
}
.icon-container {
  width: 24px;
  height: 24px;
  display: block;
  border-radius: 50%;
  position: relative;
}
.icon {
  position: relative;
  display: flex;
  margin: auto;
  top: 4px;
  left: 4px;
  font-size: 16px;
}
.title {
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 13px;
  position: relative;
  top: 2px;
  margin-left: 2px;
  color: #686769;
}
.count {
  font-family: "Nunito", sans-serif;
  position: relative;
  float: right;
  color: #686769;
  right: 2px;
  font-weight: 700;
  font-size: 18px;
}

.active .title,
.active .count {
  color: #fff;
}
</style>
