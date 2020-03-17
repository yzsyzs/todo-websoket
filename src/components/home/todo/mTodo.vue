<template>
  <section id="mTodo" ref="mTodo">
    <input type="text" v-model="input" ref="mInput">
    <div @click="oneClick">点击,请求成功返回后 改为true</div>
    <ul>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
      <li><a href="">我是websoket</a></li>
    </ul>
    <router-link tag="div" class="tab-item" activeClass="active" :to="{path: '/home/todo'}">
      <span class="tab-link">A</span>
    </router-link>
    <router-link tag="div" class="tab-item" activeClass="active" :to="{path: '/home/todo/websoket-B'}">
      <span class="tab-link">B</span>
    </router-link>
    <router-view />
  </section>
</template>

<script>
  import {debounce, throttle} from '@/tools'
  export default {
    // 组件的名称
    name: 'mTodo',
    // props 可以是数组或对象，用于接收来自父组件的数据
    props: {},
    // 数据绑定
    data () {
      return {
        input: '999',
        flag: true
      }
    },
    // 组件
    components: {},
    // 注意，不应该使用箭头函数来定义 methods函数 或者  computed函数 (例如 aDouble: () => this.a * 2)。
    // 理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined
    // 方法
    methods: {
      // 节流函数
      // throttle (fun, wait, type) {
      //   if (type === 1) {
      //     var previous = 0
      //   } else if (type === 2) {
      //     var timeout
      //   }
      //   return () => {
      //     if (type === 1) {
      //       var now = Date.now()
      //       if (now - previous > wait) {
      //         previous = now
      //       }
      //     } else if (type === 2) {
      //       if (!timeout) {
      //         timeout = setTimeout(() => {
      //           timeout = null
      //           this[fun]()
      //         }, wait)
      //       }
      //     }
      //   }
      // },
      imgLazy (flag) {
        console.log(`我是, ${flag ? 'keyup' : 'onscroll'}`)
        console.log(this.input)
      },
      // 滚动条 mTodo 监听事件方法
      mTodoScroll () {
        this.$refs.mTodo.addEventListener('scroll', throttle(this, 'imgLazy', 2000, 2))
      },
      // 防抖函数
      // debounce (fun, wait, immediate) {
      //   var timeout
      //   return () => {
      //     if (timeout) clearTimeout(timeout)
      //     if (immediate) {
      //       var callNow = !timeout
      //       timeout = setTimeout(() => {
      //         timeout = null
      //       }, wait)
      //       if (callNow) this[fun]()
      //     } else {
      //       timeout = setTimeout(() => {
      //         this[fun](true)
      //       }, wait)
      //     }
      //   }
      // },
      mTodoClick () {
        this.$refs.mInput.addEventListener('keyup', debounce(this, 'imgLazy', 2000))
      },
      oneClick () {
        if (!this.flag) return false
        this.flag = false
        console.log('one')
        // 请求接口 返回成功后 this.flag = true
      }
    },
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
      this.mTodoScroll()
      this.mTodoClick()
    },
    // 销毁，可以做一些定时器的销毁,缓存的清除等操作
    destroyed () {
    }
  }
</script>

<style lang="scss" scoped='scoped'>
  #mTodo {
    @include flex-1;
    background-color: $color;
    width: 80%;
  }
</style>
