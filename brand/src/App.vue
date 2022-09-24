<template>
  <div id="app">
    <div class="container">
      <!-- 顶部框模块 -->
      <div class="form-group">
        <div class="input-group">
          <h4>品牌管理</h4>
        </div>
      </div>

      <!-- 数据表格 -->
      <table class="table table-bordered table-hover mt-2">
        <thead>
          <tr>
            <th>编号</th>
            <th>资产名称</th>
            <th>价格</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <!-- 如果价格超过100，就有red这个类 -->
            <td :class="{ red: item.price > 100 }">{{ item.price }}</td>
            <!-- 过滤器使用 -->
            <td>{{ item.time | getTime }}</td>
            <td><a href="#" @click="del(item.id)">删除</a></td>
          </tr>
          <tr style="background-color: #eee" v-if="this.list.length">
            <td>统计:</td>
            <td colspan="2">总价钱为: {{ allPrice }}</td>
            <td colspan="2">平均价: {{ svgPrice }}</td>
          </tr>
        </tbody>

        <tfoot v-if="list.length === 0">
          <tr>
            <td colspan="5" style="text-align: center">暂无数据</td>
          </tr>
        </tfoot>
      </table>

      <!-- 添加资产 -->
      <form class="form-inline">
        <div class="form-group">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="资产名称"
              v-model="name"
            />
          </div>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div class="form-group">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="价格"
              v-model.number="price"
            />
          </div>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <!-- 阻止表单提交 -->
        <button class="btn btn-primary" @click.prevent="add">添加资产</button>
      </form>
    </div>
  </div>
</template>

<script>
// 引入模块
import moment from "moment";
export default {
  // !静态数据
  data() {
    return {
      name: "", // 名称
      price: "", // 价格
      // 本取出list, 有数据就取出来,没有就给数组
      list: JSON.parse(localStorage.getItem("brand")) || []
    };
  },
  // !普通方法
  methods: {
    // 添加
    add() {
      if (this.name === "" || this.price === "" ) {
        alert("请输入内容");
        return;
      }
      // 把输入框的值追加到数组
      this.list.push({
        id: this.list.length !== 0 ? this.list[this.list.length - 1].id + 1 : 100,
        name: this.name,
        price: this.price,
        time: new Date(),
      });
      this.name = "";
      this.price = "";
    },
    // 删除
    del(id) {
      const index = this.list.findIndex((item) => item.id === id);
      this.list.splice(index, 1);
    },
  },
  // !计算属性 跟data中的变量不能重名 变量值改变会从新计算并返回
  // 多次使用这个计算属性的话,如果内容不改变,只会从缓存中拿数据
  computed: {
    // 总价
    allPrice() {
      // arr.reduce((累积变量,每一项元素) => {},初始值) 累计求和方法
      return this.list.reduce((sum, item) => (sum += item.price), 0);
    },
    // 均价 完整写法
    svgPrice: {
      // 给计算属性赋值使用set
      set(val) {
        console.log(val);
      },
      // 取值
      get() {
        // toFixed 保留两位小数
        return (this.allPrice / this.list.length).toFixed(2);
      },
    },
  },
  // !过滤器
  filters: {
    getTime(date) {
      // node的时间处理模块
      return moment(date).format("YYYY-MM-DD");
    },
  },
  // !侦听器
  watch: {
    list: {
      // 侦听list数据改变时执行的函数 可以有形参 默认第一个是新的数据 第二个是老的数据
      handler() {
        localStorage.setItem("brand", JSON.stringify(this.list));
      },
      // 开启深度侦听(对象里的值改变)
      deep: true,
      // 立即侦听 网页打开就先执行一次
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
// 使用less语法 scoped 只允许当前vue使用
.red {
  color: red;
}
</style>