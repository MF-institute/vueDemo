<template>
  <div class="my-header" :style="{backgroundColor, color}">{{ title }}</div>
</template>

<script>
export default {
  // 允许对props的值 进行校验
  // 外部使用 遵循变量名作为属性名,值类型
  props: {
    backgroundColor: String,
    color: {
      // 传过来的数据类型
      type: String,
      // 默认值
      default: "#fff",
    },
    title: {
      type: String,
      // 规定为必须穿入此变量的值
      required: true
    }
  },
};
</script>

<style lang="less" scoped>
.my-header {
  height: 45px;
  line-height: 45px;
  text-align: center;
  background-color: #1d7bff;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
}
</style>