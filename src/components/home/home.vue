<template>
  <div id="home">
    <div class="home-header flex">
      <router-link tag="div" class="tab-item" activeClass="active" :to="{path: '/home'}" exact>
        <span class="tab-link">首 页</span>
      </router-link>
      <router-link tag="div" class="tab-item" activeClass="active" :to="{path: '/home/websoket'}">
        <span class="tab-link">测试websoket</span>
      </router-link>
      <router-link tag="div" class="tab-item" activeClass="active" :to="{path: '/login'}">
        <span class="tab-link">登 录</span>
      </router-link>
    </div>
    <router-view/>
    <div class="home-footer">联系我们01234567890</div>
  </div>
</template>

<script>
  export default {
    // 组件的名称
    name: 'home',
    // props 可以是数组或对象，用于接收来自父组件的数据
    props: {},
    // 数据绑定
    data () {
      return {
        activeName: null
      }
    },
    // 组件
    components: {},
    // 注意，不应该使用箭头函数来定义 methods函数 或者  computed函数 (例如 aDouble: () => this.a * 2)。
    // 理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined
    // 方法
    methods: {
      // 路由 变化的 时候 菜单跟着变化
      activePath () {
        this.activeName = this.$route.name
      }
    },
    // 计算属性
    computed: {},
    // 监听
    watch: {
      // 监听路由变化
      '$route': 'activePath'
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
  #home {
    min-height: 100vh;
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-size: $font-18;
    div.home-header {
      flex: 0 0 .6rem;
      background: $color-b3;
      justify-content: center;
      align-items: center;
      @keyframes add-width {
        from {
          width: 0
        }

        to {
          width: 100%;
        }
      }

      .active {
        .tab-link {
          position: relative;

          &:after {
            content: ' ';
            position: absolute;
            z-index: 2;
            bottom: -0.1rem;
            left: 50%;
            display: block;
            width: 100%;
            height: 2px;
            transform: translate(-50%);
            background: $background-ff;
          }

          color: $color-6e;
        }
      }
      div.tab-item {
        flex: 1;
        -ms-flex: 1;

        .tab-link {
          position: relative;

          &:after {
            content: ' ';
            position: absolute;
            z-index: 2;
            bottom: -0.1rem;
            left: 50%;
            display: block;
            width: 100%;
            height: 2px;
            transform: translate(-50%);
          }

          &:hover:after {
            height: 2px;
            animation: add-width .5s linear forwards;
            width: 100%;
            background: $background-ff;
          }

          &:hover {
            color: $color-6e;
            cursor: pointer;
          }
        }

        /*&.router-link-active {
          .tab-link {
            position: relative;
            &:after {
              content: ' ';
              position: absolute;
              z-index: 2;
              bottom: -0.1rem;
              left: 50%;
              display: block;
              width: 100%;
              height: 2px;
              transform: translate(-50%);
              background: $background-ff;
            }
            color: $color-6e;
          }
        }*/
      }
    }

    div.home-footer {
      flex: 0 0 .6rem;
      line-height: .6rem;
      background: $color-b3;
      color: $color-f3;
    }
  }
</style>
