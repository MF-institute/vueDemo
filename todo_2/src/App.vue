<template>
  <section class="todoapp">
    <!-- 
      1. 初始化项目
      2. 新建三个组件并将样式解构代码写进去
      3. 在APP.vue文件中引入,注册,使用组件
      
      4. 使用数据渲染事项列表,  父向子传值
      5. 实现回车添加新事项,    子向父传值
      6. 点击删除单条数据,      子向父
      7. 渲染事项条数           父向子
      8. tab栏切换              footer子向父传值,使用计算属性判断后,父把值再传给main
      9. 清空已完成项           子向父  遍历判断boolel值把为false的所有数据,覆盖掉之前的值
      10. 本地存储
    -->

    <!-- 除了驼峰, 还可以使用-转换链接 -->
    <TodoHeader @custom="add" :arr="list" @allFn="allFn"></TodoHeader>
    <!-- 将list数据传给子组件 通过自定义事件来接受组件传的值 然后做出相应动作 -->
    <TodoMain :arr="getFlag" @delFn="delFn" @DoneFn="DoneFn"></TodoMain>
    <TodoFooter
      :arr="getFlag"
      @flagVal="flagVal"
      @clearFn="clearFn"
    ></TodoFooter>
  </section>
</template>

<script>
// 样式引入
import "./styles/base.css";
import "./styles/index.css";
// flexbox
import "./js/flexible";

// 组件引入
import TodoHeader from "./components/todoHeader.vue";
import TodoMain from "./components/todoMain";
import TodoFooter from "./components/todoFooter";

export default {
  // 静态数据
  data() {
    return {
      // 要传给子组件的数据
      list: JSON.parse(localStorage.getItem("todos")) || [],
      // 初始值
      val: "all",
    };
  },
  // 方法集合
  methods: {
    // 添加
    add(name) {
      // ID
      const id =
        this.list.length === 0 ? 100 : this.list[this.list.length - 1].id + 1;
      // 把数据追加到数组
      this.list.push({
        id,
        name,
        isDone: false,
      });
    },
    // 删除
    delFn(id) {
      // 找到包含这个id的对象在数组中的下标
      // !findIndex 是否包含某个内容,包含返回索引 否则返回-1
      const index = this.list.findIndex((obj) => obj.id === id);
      // 删除索引index的数据
      this.list.splice(index, 1);
    },
    // 接收tab切换的值
    flagVal(val) {
      this.val = val;
    },
    // 清空所有已完成项
    clearFn() {
      // !遍历删除数据中obj.isDone === true的数据 bug ------------->

      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].isDone === true) this.list.splice(i--,1)
      }

      // this.list.forEach((item, index) => {
      //   if (item.isDone === true) this.list.splice(index--,1)
      // });

      // !end -------------^
    },
    // 点击复选框,把复选框的最新状态从新赋值到list
    DoneFn(state, id) {
      // 找到跟这个id相等的元素的索引, 然后把传过来的状态从新赋值 存入本地
      const index = this.list.findIndex((obj) => obj.id === id);
      // 不取反就不能用
      this.list[index].isDone = !state;
    },
    // !将list从新赋值并更新到本地
    allFn(arr) {
      this.list = arr;
    },
  },
  // 计算属性
  computed: {
    // 处理数据显示 tab
    getFlag() {
      if (this.val === "no") {
        // filter 遍历筛选符合条件的元素 返回一个新数组
        return this.list.filter((obj) => obj.isDone === false);
      } else if (this.val === "ok") {
        return this.list.filter((obj) => obj.isDone === true);
      } else {
        return this.list;
      }
    },
  },
  // 组件注册
  components: {
    TodoHeader,
    TodoMain,
    TodoFooter,
  },
  // !数据缓存 很重要 {侦听器}
  watch: {
    list: {
      deep: true,
      handler() {
        // 只要list变化 - 覆盖式保存到localStorage里
        localStorage.setItem("todos", JSON.stringify(this.list));
      },
    },
  },
};
</script>