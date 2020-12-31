<template>
  <div
    class="list"
    :class="{ active: active }"
    @click="changeCurrentList(list.uid)"
    @dblclick="editList(list.uid)"
    @mouseenter="showEditButton = true"
    @mouseleave="showEditButton = false"
  >
    <span class="icon-container" :style="{ background: color }">
      <span class="icon" :class="'icon-' + list.icon"></span>
    </span>
    <span class="title">{{ list.name }}</span>
    <div class="float-right">
      <span
        v-show="showEditButton"
        class="edit-button icon icon-info"
        @click.stop="editList(list.uid)"
      ></span>
      <span class="count">{{ count }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "List",
  props: {
    list: Object,
  },
  data: function() {
    return {
      showEditButton: false,
    };
  },
  methods: {
    ...mapMutations(["changeCurrentList", "editList"]),
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
  },
};
</script>

<style scoped>
.list {
  height: 36px;
  /* background: #d2d2d2; */
  margin: 0 -12px;
  position: relative;
  user-select: none;
}
.icon-container {
  width: 22px;
  height: 22px;
  display: block;
  top: 6px;
  left: 20px;
  border-radius: 20px;
  position: relative;
  background: #ffcc00;
}
.icon {
  color: #fff;
  position: relative;
  display: block;
  margin: auto;
  top: 4px;
  left: 4px;
  font-size: 14px;
}
.title {
  position: absolute;
  top: 8px;
  left: 51px;
  font-size: 13px;
  color: #000;
}
.active.list {
  background: #d2d2d2;
}
.float-right {
  position: absolute;
  top: 9px;
  right: 12px;
  display: flex;
  justify-content: flex-end;
  font-size: 13px;
  color: #686769;
}
.icon-info {
  color: #686769;
  font-size: 14px;
  margin: -2px 14px;
  cursor: pointer;
}
</style>
