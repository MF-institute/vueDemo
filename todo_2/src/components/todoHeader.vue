<template>
  <header class="header">
    <h1>Todos</h1>
    <p>{{ time }}</p>
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      @click="allFn"
      v-model="all"
    />
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
      time: new Date().toLocaleDateString()
    };
  },
  props: ["arr"],
  methods: {
    downFn() {
      this.$emit("custom", this.name);
      this.name = "";
    },
    allFn() {
      this.$emit("allFn", this.arr);
    },
  },
  computed: {
    // 点击全选
    all: {
      set(checked) {
        this.arr.forEach((obj) => (obj.isDone = checked));
      },
      get() {
        return (
          this.arr.length !== 0 && this.arr.every((obj) => obj.isDone === true)
        );
      },
    },
  },
};
</script>