<template>
  <div class="my-counter">
    <!-- list.goods_count ++ -- 操作 设定限制 -->
    <button
      type="button"
      class="btn btn-light"
      :disabled="carObj.goods_count === 1"
      @click="carObj.goods_count--"
    >
      -
    </button>
    <input type="number" class="form-control inp" v-model.number="carObj.goods_count" />
    <button
      type="button"
      class="btn btn-light"
      :disabled="carObj.goods_count >= 99"
      @click="carObj.goods_count++"
    >
      +
    </button>
  </div>
</template>

<script>
// !BUG
// 1. 输入框看不值 => 样式问题 改一下宽度

export default {
  // 父组件传过来的值
  props: {
    carObj: Object,
  },
  // 侦听器
  watch: {
    carObj: {
      // 开启深度侦听
      deep: true,
      // 当侦听的对象发生改变时触发
      handler() {
        if (this.carObj.goods_count < 1) this.carObj.goods_count = 1;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.my-counter {
  display: flex;
  .inp {
    width: 3rem;
    text-align: center;
    margin: 0 0.1rem;
  }
  .btn,
  .inp {
    transform: scale(0.9);
  }
}
</style>