<template>
  <div id="login">
    <div @click="gotoHome">跳转到首页...</div>
    <div v-for="(item, index) in list" :key="index" style="display:inline-block;">
      <input
        type="checkbox"
        :id="item.id"
        :value="item.value"
        v-model="checkedNames"
        @change="handleClick"
      />
      {{item.id}}
    </div>

    <!-- <input type="checkbox" id="john" value="John" v-model="checkedNames" /> -->
    <span>Checked names: {{ checkedNames }}</span>
    <br/>
    <span>Checked names: {{ watchNames }}</span>
  </div>
</template>

<script>
  export default {
    // 组件的名称
    name: 'login',
    // props 可以是数组或对象，用于接收来自父组件的数据
    props: {},
    // 数据绑定
    data () {
      return {
        checkedNames: [],
        list: [
          {id: 'jack', value: '2'},
          {id: 'ok', value: '55'}
        ],
        watchNames: ''
      }
    },
    // 组件
    components: {},
    // 注意，不应该使用箭头函数来定义 methods函数 或者  computed函数 (例如 aDouble: () => this.a * 2)。
    // 理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined
    // 方法
    methods: {
      gotoHome () {
        this.$router.push({path: '/'})
      },
      handleClick () {
        this.watchNames = this.checkedNames.join()
      }
    },
    // 计算属性
    computed: {},
    // 监听
    watch: {
      watchNames (newVal, oldVal) {
        // console.log(newVal);
        // console.log('旧的值', oldVal);
      }
      // 监听路由变化
    },
    // 常用钩子函数，总共有8个，可以参照vue的生命周期看
    // 完成了 data 数据的初始化，el没有，就是说页面的dom没有完成转化，还是 {{data}} 这种
    created () {
      let list = [
        {'langKey': 'zh-CN', 'wordKey': 'title', 'wordValue': '表提'},
        {'langKey': 'en-US', 'wordKey': 'title', 'wordValue': 'title'},
        {'langKey': 'en-US', 'wordKey': 'remove', 'wordValue': 'delete'}
        // {'langKey': 'en-US', 'wordKey': 'remove', 'wordValue': '删除'}
      ]
      let hash = {}
      for (let i of list) {
        if (!hash[i.wordKey]) {
          hash[i.wordKey] = [i]
        } else {
          hash[i.wordKey] = [...hash[i.wordKey], ...[i]]
        }
      }
      console.log(hash)
      let arr = ['zh-CN','zh-TW','en-US', 'vi-VN']
      for (let k in hash) {
        for (let j = 0; j < 4 - hash[k].length; j ++) { // 这个是 遍历 要补充多少个的
          if (arr.includes(hash[k].langKey)) { // 这里 应该是 过滤掉找到的, 在 遍历 没找到的 let i =0; i< 没找到的.length; i ++
            hash[k].push({langKey: '没找到的[i]', wordKey: k, wordValue: ''})
          }
        }
      }
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
  #login {
  }
</style>
