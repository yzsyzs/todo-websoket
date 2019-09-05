<template>
  <div id="websoket" style="display:flex;">
    <div style="flex: 0 0 400px"></div>
    <div style="flex: 1;text-align: left;position: relative">
      <transition name="slide-fade">
        <h4 v-if="flag" style="color: #f00;position: absolute;left:0;top:0" @mouseenter.self="flag = false">浮窗</h4>
        <div v-else style="color: #0f0;padding-left: 200px;position: absolute;left:0;top:0" @mouseout.self="flag = true">返回首页</div>
      </transition>
    </div>
<!--    <ul>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--      <li><a href="">我是websoket</a></li>-->
<!--    </ul>-->
  </div>
</template>

<script>
  export default {
    // 组件的名称
    name: 'websoket',
    // props 可以是数组或对象，用于接收来自父组件的数据
    props: {},
    // 数据绑定
    data () {
      return {
        flag: true
      }
    },
    // 组件
    components: {},
    // 注意，不应该使用箭头函数来定义 methods函数 或者  computed函数 (例如 aDouble: () => this.a * 2)。
    // 理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined
    // 方法
    methods: {},
    // 计算属性
    computed: {},
    // 监听
    watch: {
      // 监听路由变化
    },
    // 常用钩子函数，总共有8个，可以参照vue的生命周期看
    // 完成了 data 数据的初始化，el没有，就是说页面的dom没有完成转化，还是 {{data}} 这种
    created () {
    },
    // 完成挂载，相当于dom ready
    mounted () {
    },
    // 销毁，可以做一些定时器的销毁,缓存的清除等操作
    destroyed () {
    }
  }
</script>

<style lang="scss" scoped='scoped'>
  #websoket {
    @include flex-1;
    .bounce-enter-active {
      animation: bounce-in .5s;
    }
    .bounce-leave-active {
      animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }
    .slide-fade-enter-active {
      transition: all 1s ease;
    }
    .slide-fade-leave-active {
      transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter
      /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateX(-100px);
      opacity: 0;
    }
    .slide-fade-leave-to {
      transform: translateX(-50px);
      opacity: 0;
    }
  }
</style>
