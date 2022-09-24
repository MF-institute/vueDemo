<template>
  <!-- 底部 -->
  <div class="my-footer">
    <!-- 全选 -->
    <div class="custom-control custom-checkbox">
      <input
        type="checkbox"
        class="custom-control-input"
        id="footerCheck"
        v-model="isAll"
      />
      <label class="custom-control-label" for="footerCheck">全选</label>
    </div>
    <!-- 合计 -->
    <div>
      <span>合计: </span>
      <span class="price">¥{{ totalPrice }}</span>
    </div>
    <!-- 按钮 -->
    <button type="button" class="footer-btn btn btn-primary">结算 ( {{ allCount }} )</button>
  </div>
</template>

<script>
export default {
  // ? 这里存在单向数据流吗?
  props: {
    arr: Array,
  },
  // 计算属性
  computed: {
    // 计算属性完整写法
    isAll: {
      // 需要用数据的时候用set
      set(bool) {
        // 1. 触发父项准备的方法来实现
        this.$emit('state', bool)
        // 2. 直接改可以实现
        // this.arr.forEach(obj => obj.goods_state = bool);
      },
      get() {
        // every 只要有一个不匹配就返回false
        return this.arr.every(obj => obj.goods_state === true )
      }
    },
    allCount() {
      // 把 reduce 返回的值return出来
      return this.arr.reduce((sum, obj) => {
        if(obj.goods_state) sum += obj.goods_count
        // 把当前这里一轮的sum存给sum
        return sum
      }, 0)
    },
    totalPrice() {
      // 把 reduce 返回的值return出来
      return this.arr.reduce((sum, obj) => {
        // 单价*数量
        if(obj.goods_state) sum += obj.goods_price * obj.goods_count
        // 把当前这里一轮的sum存给sum
        return sum
      }, 0)
    }
  }
};
</script>

<style lang="less" scoped>
.my-footer {
  position: fixed;
  z-index: 2;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background: #fff;

  .price {
    color: red;
    font-weight: bold;
    font-size: 15px;
  }
  .footer-btn {
    min-width: 80px;
    height: 30px;
    line-height: 30px;
    border-radius: 25px;
    padding: 0;
  }
  #footerCheck {
    margin-right: 5px;
  }
  [type="button"] {
    padding: 0 10px;
  }
}
</style>