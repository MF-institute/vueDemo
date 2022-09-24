<template>
  <header class="header">
    <h1>todos</h1>
    <input id="toggle-all" class="toggle-all" type="checkbox" @click="toggleStatus" v-model="checked" />
    <label for="toggle-all"></label>
    <input
      class="new-todo"
      placeholder="输入任务名称-回车确认"
      autofocus
      @keydown.enter="downFn"
      v-model="name"
    />
  </header>
</template>

<script>
// !输入框
export default {
  data() {
    return {
      name: "",
      // v-model的状态 其实就是true或者false, 哪里不要写arr
      tempArr: [],
      checked: '', 
    };
  },
  // props 父级传过来的, 一般放在这个位置好看一些,
  props: ["arr"],
  mounted(){
    // 把传过来的arr深拷贝一下, 不然还是会有引用关系, 会相互印象.刚才的问题就是用computed去修改了arr
    this.tempArr = JSON.parse(JSON.stringify(this.arr))
    // !位置顺序很重要
    this.checked = (this.tempArr.every(el => el.isDone === true)) ? true : false
  },
  methods: {
    downFn() {
      this.$emit("custom", this.name);
      this.name = "";
    },
    // 切换状态 语义化一点点哈
    toggleStatus() {
      this.checked = !this.checked // 点击一下就切换一下v-model的状态
      this.tempArr.forEach(el => el.isDone = this.checked)
      this.$emit("toggle", this.tempArr);
    }
  },
  // computed: {
  //   // 全选
  //   all: {
  //     // 写入
  //     set(checked) {
  //       // 将所有的小选全部选中
  //       this.arr.forEach((obj) => (obj.isDone = checked));
  //     },
  //     // 输出
  //     get() {
  //       // arr长度不能为0 如果isDone全部都为true 则
  //       return this.arr.length !== 0 && this.arr.every((obj) => obj.isDone === true);
  //     },
  //   },
  // },

};
</script>