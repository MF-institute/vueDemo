<template>
  <footer class="footer">
    <!-- 使用计算属性的数据 也可以之间把length写在这 -->
    <span class="todo-count">剩余 <strong>{{ count }}</strong> 个待办项</span>
    <!-- 事件委托 -->
    <ul class="filters" @click="flagVal">
      <!-- 通过判断条件来动态生效类 点击那个就给条件从新赋值 -->
      <li>
        <a :class="{selected: flag === 'all'}" @click="flag = 'all'" href="javascript:;" >全部</a>
      </li>
      <li>
        <a :class="{selected: flag === 'no'}" @click="flag = 'no'" href="javascript:;">未完成</a>
      </li>
      <li>
        <a :class="{selected: flag === 'ok'}" @click="flag = 'ok'" href="javascript:;" >已完成</a>
      </li>
    </ul>
    <button class="clear-completed" @click="clear">清除已完成</button>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      // 按钮的判断条件
      flag: 'all'
    }
  },
  // 普通方法
  methods: {
    flagVal(){
      // 主动触发主文件中给准备的自定义事件 并将当前点击的这个元素的自定义值传给主页面
      this.$emit('flagVal', this.flag)
    },
    clear() {
      this.$emit('clearFn')
    }
  },
  // 计算属性 可以说是动态数据 
  computed: {
    count() {
      return this.arr.length
    }
  },
  // 定义主文件传过来的值
  props: ['arr']
}
</script>