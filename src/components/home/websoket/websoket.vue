<template>
  <div id="websoket" style="display:flex;">
    <div style="flex: 0 0 100px">
      <div class="img" :class="{animation: isTrue}"></div>
      <div @click="isTrue = !isTrue">点击我动画</div>
    </div>
    <div style="flex: 1;text-align: left;position: relative">
      <div>
        <transition name="slide-fade">
          <h4 v-if="flag" style="color: #f00;position: absolute;left:0;top:0" @mouseenter.self="flag = false">浮窗</h4>
          <div v-else style="color: #0f0;padding-left: 200px;position: absolute;left:0;top:0"
               @mouseleave.self="flag = true">返回首页
          </div>
        </transition>
      </div>
      <div id="lineChart" ref="lineChart" style="height: 500px;width: 100%;margin-top: 150px"></div>
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
  import echarts from 'echarts'

  export default {
    // 组件的名称
    name: 'websoket',
    // props 可以是数组或对象，用于接收来自父组件的数据
    props: {},
    // 数据绑定
    data () {
      return {
        flag: true,
        isTrue: false
      }
    },
    // 组件
    components: {},
    // 注意，不应该使用箭头函数来定义 methods函数 或者  computed函数 (例如 aDouble: () => this.a * 2)。
    // 理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined
    // 方法
    methods: {
      // 折线图
      initLineChart () {
        let dom = this.$refs.lineChart
        let myChart = echarts.init(dom)
        let option = {
          title: {
            text: '一天用电量分布',
            subtext: '纯属虚构'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} W'
            },
            axisPointer: {
              snap: true
            }
          },
          visualMap: {
            show: false,
            dimension: 1,
            pieces: [],
            outOfRange: {
              color: 'green'
            }
          },
          series: [
            {
              name: '用电量',
              type: 'line',
              smooth: true,
              data: [],
              // markArea: {
              //   data: [ [{
              //     name: '早高峰',
              //     xAxis: '07:30'
              //   }, {
              //     xAxis: '10:00'
              //   }], [{
              //     name: '晚高峰',
              //     xAxis: '17:30'
              //   }, {
              //     xAxis: '21:15'
              //   }] ]
              // }
              markLine: {
                silent: true,
                lineStyle: {
                  normal: {
                    color: '#01fef9'
                  }
                },
                data: [{
                  yAxis: 500
                }],
                label: {
                  normal: {
                    formatter: '500'
                  }
                }
              }
            }
          ]
        }
        let data = [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400]
        let max = Math.max.apply(Math, data)
        option.series[0].data = data
        option.visualMap.pieces[0] = {gte: 500, lte: max, color: '#f00'}
        if (option && typeof option === 'object') {
          myChart.setOption(option, true)
          window.addEventListener('resize', () => {
            myChart.resize()
          })
        }
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
      this.initLineChart()
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
      /* .slide-fade-leave-active for below version 2.1.8 */
    {
      transform: translateX(-100px);
      opacity: 0;
    }

    .slide-fade-leave-to {
      transform: translateX(-50px);
      opacity: 0;
    }

    .animation {
      animation: gradientChange .3s infinite alternate;
      @keyframes gradientChange {
        0% {
          background: url('../../../assets/btn.png') no-repeat;
        }
        100% {
          background: url('../../../assets/btn_select.png') no-repeat;
        }
      }
    }

    .img {
      width: 40px;
      height: 40px;
      /*background: url('../../../assets/btn.png') no-repeat;*/
    }
  }
</style>
