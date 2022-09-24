<template>
  <div class="my-goods-item">
    <div class="left">
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          :id="list.id"
          v-model="list.goods_state"
        />
        <label class="custom-control-label" :for="list.id">
          <img :src="list.goods_img" />
        </label>
      </div>
    </div>
    <div class="right">
      <div class="top">{{ list.goods_name }}</div>
      <div class="bottom">
        <span class="price">¥ {{ list.goods_price }}</span>
        <span>
          <!-- 给子组件传值 -->
          <CarCount :carObj="list"></CarCount>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import CarCount from "./CarCount";
export default {
  // 父组件传过来的值,可以设置接受值的类型
  props: {
    carObj: Object,
  },
  data() {
    return {
      list: this.carObj,
    };
  },
  // 注册组件
  components: {
    CarCount,
  },
};
</script>

<style lang="less" scoped>
.my-goods-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .left {
    img {
      width: 120px;
      height: 120px;
      margin-right: 8px;
      border-radius: 10px;
    }
    .custom-control-label::before,
    .custom-control-label::after {
      top: 50px;
    }
    .custom-control-input {
      margin-right: 10px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      font-size: 14px;
      font-weight: 700;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      align-items: center;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
}
</style>