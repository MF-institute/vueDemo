import Vue from 'vue'
import App from './App.vue'
// 引入bootstrap.css
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

// 引入axios
import axios from 'axios'
// !全局配置axios基地址
axios.defaults.baseURL = 'https://www.escook.cn'
// 挂在到vue原型上
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
