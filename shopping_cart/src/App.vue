<template>
<!--
  eslint error:
  1. 文件名不能跟原生组件重名
-->
  <div>
    <CarHeader  title="JD 购物车"></CarHeader>
    <div class="main">
      <CarGoods v-for="obj in list" :key="obj.id" :carObj='obj'></CarGoods>
    </div>
    <CarFooter :arr='list' @state='state'></CarFooter>
  </div>
</template>

<script>
import CarHeader from "./components/CarHeader";
import CarFooter from "./components/CarFooter";
import CarGoods from "./components/CarGoods";
export default {
  data() {
    return {
      list: []
    }
  },
  // 注册组件
  components: {
    CarHeader,
    CarFooter,
    CarGoods
  },
  // 初始化结束阶段
  created() {
    this.$axios({
      url: '/api/cart'
    }).then(res => {
      // 将数据中的商品列表传给data
      this.list = res.data.list
    })
  },
  methods: {
    // 给 footer 准备的小选影响全选函数
    state(bool){
      this.list.forEach(obj => obj.goods_state = bool)
    }
  }
};
</script>

<style lang="less" scoped>
.main{
  margin: 50px 0;
}
</style>