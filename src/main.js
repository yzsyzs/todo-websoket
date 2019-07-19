// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/assets/css/style.scss'
// 兼容IE8以上 ES6 语法问题
import 'babel-polyfill'
// 引入全局过滤器
import filters from './filters'

// 设置给Vue
Object.keys(filters).forEach(function (key) {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
