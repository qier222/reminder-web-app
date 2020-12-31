<template>
  <div class="modal">
    <div class="icon-block">
      <div class="icon-container">
        <span class="icon icon-tray"></span>
      </div>
    </div>
    <div class="edit-block">
      <div class="info">"{{ list.name }}" Info</div>
      <div class="input-field">
        <span>Name:</span><input type="text" v-model="listNewName" />
      </div>
      <div class="buttons">
        <div class="right">
          <button @click="cancel">Cancel</button>
          <button class="default" @click="save">
            OK
          </button>
        </div>
        <div class="left">
          <button @click="deleteListAlt">
            <span class="icon icon-trash-fill"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "EditList",
  data: function() {
    return {
      list: "",
      listNewName: "",
    };
  },
  computed: {
    ...mapState(["listOnModal"]),
    ...mapGetters(["getListByUid"]),
  },
  methods: {
    ...mapMutations(["deleteList", "updateListName", "closeEditList"]),
    save() {
      if (this.list.name != this.listNewName) {
        this.updateListName({
          uid: this.list.uid,
          name: this.listNewName,
        });
      }
      this.closeEditList();
    },
    cancel() {
      if (this.list.name == "New List") {
        this.deleteList(this.list.uid);
      }
      this.closeEditList();
    },
    deleteListAlt() {
      this.deleteList(this.list.uid);
      this.closeEditList();
    },
  },
  created: function() {
    this.list = this.getListByUid(this.listOnModal);
    this.listNewName = this.list.name;
  },
};
</script>

<style scoped>
.modal {
  height: 144px;
  width: 450px;
  background: #efefef;
  position: fixed;
  top: 0;
  margin: 0 auto;
  left: 0;
  right: 0;
  box-shadow: 0 0 1px 0 rgba(44, 47, 51, 1),
    0 4px 8px 6px rgba(202, 202, 202, 0.6);
  display: flex;
  user-select: none;
}
.icon-block {
  width: 104px;
  height: 100%;
  background: #dcdcdc;
  position: relative;
}
.icon-container {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #0074f6;
  box-shadow: 0 2px 8px 3px rgba(52, 120, 197, 0.44),
    inset 4px 4px 16px 0 rgba(197, 197, 197, 0.3),
    inset -4px -4px 4px 0 rgba(43, 43, 43, 0.08);
  position: relative;
  top: 20px;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-container:after {
  display: block;
  content: "";
  border-width: 7px 5px 7px 5px;
  border-style: solid;
  border-color: #7f8488 transparent transparent transparent;
  position: absolute;
  right: -6px;
  top: 88%;
}
.icon {
  font-size: 36px;
  color: #fff;
}

.edit-block {
  padding: 20px;
  flex: 1;
  position: relative;
}
.edit-block .info {
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 14px;
}
.edit-block .input-field {
  font-size: 13px;
  margin-top: 12px;
}
.edit-block .input-field input {
  margin-left: 10px;
  border: none;
  padding: 2px;

  width: 80%;
  box-shadow: 0 0 1px 0 rgba(44, 47, 51, 1);
}
input:focus {
  outline: none;
}
.buttons .right {
  position: absolute;
  bottom: 16px;
  right: 14px;
}
.buttons .left {
  position: absolute;
  bottom: 16px;
  left: 14px;
}
.buttons .left button {
  height: 20px;
  width: 24px;
  color: rgb(61, 61, 61);
}
.buttons .left span {
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: inherit;
}
.buttons button {
  margin: 0 6px;
  border: none;
  background: #fff;
  border-radius: 3px;
  font-size: 10px;
  height: 20px;
  width: 66px;
  color: #000;
  box-shadow: 0 0px 1px 0 rgba(44, 47, 51, 0.7),
    0 0px 1px 0 rgba(44, 47, 51, 0.1), 0 1px 1px 0 rgba(44, 47, 51, 0.2),
    0 1px 4px 0 rgba(233, 233, 234, 1);
}
button:active {
  background: linear-gradient(to bottom, #6ba5fb, #0058db);
  box-shadow: 0 0 1px 0 rgba(44, 47, 51, 0.1), 0 1px 4px 0 rgba(0, 85, 212, 0.3);
  color: #fff !important;
  outline: none;
}
button:focus {
  outline: none;
}
</style>
