<template>
  <ul class="todo-list">
    <!-- 循环任务 关联选中状态 铺设状态 -->
    <!-- 动态类名设置 completed -->
    <li :class="{completed: obj.isDone}" v-for="obj in arr" :key="obj.id">
      <div class="view" >
        <!-- v-model="obj.isDone" 复选框的选中状态 -->
        <input class="toggle" type="checkbox" v-model="obj.isDone" @click="Done(obj.isDone, obj.id)" />
        <label>{{ obj.name }}</label>
        <button class="destroy" @click="delFn(obj.id)"></button>
      </div>
    </li>
  </ul>
  
</template>

<script>
// !任务列表
export default {
  // 定义主文件传过来的值
  props: ['arr'],
  methods: {
    delFn(id) {
      // 主动触发主文件中给准备的自定义事件 并传值
      this.$emit('delFn', id)
    },
    Done(state, id) {
      this.$emit('DoneFn', state, id)
    }
  }
}
</script>