<template>
  <div class="box">
    <span
      class="icon icon-search"
      :style="{ color: inputFocus ? '#000' : '#a8a8a8' }"
    ></span>
    <input
      type="text"
      name=""
      id=""
      placeholder="Search"
      @focus="inputFocus = true"
      @blur="inputFocus = false"
      @input="searchTodos"
      v-model="search.keyword"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "SearchBox",
  data: function() {
    return {
      inputFocus: Boolean,
    };
  },
  computed: {
    ...mapState(["search"]),
  },
  methods: {
    ...mapMutations(["searchTodos"]),
  },
};
</script>

<style scoped>
.box {
  position: relative;
  margin: 0 4px;
  background: #e0e0e0;
  height: 20px;
  border-radius: 4px;
  box-shadow: inset 0 0 1px 0 rgba(44, 47, 51, 0.4);
}
.icon {
  position: absolute;
  color: #a8a8a8;
  top: 4px;
  left: 4px;
  font-size: 12px;
}
input {
  position: absolute;
  left: 18px;
  background: none;
  border: none;
  height: 20px;
  outline: none;
  width: 90%;
  font-size: 12px;
}
input::placeholder {
  color: #a8a8a8;
}
</style>
