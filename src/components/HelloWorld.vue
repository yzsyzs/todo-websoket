<template>
  <div class="hello">
  </div>
</template>

<script>
  // mapMutations,
  import {mapGetters, mapActions, mapState} from 'vuex'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        activeBtnForm: false
      }
    },
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters('user', [
        'getUserGetter'
      ]),
      ...mapGetters([
        'detailObj'
      ]),
      ...mapState('user', {
        user: state => state.user
      }),
      ...mapState({
        detailObj: state => state.detailObj
      })
    },
    created () {
      console.log(this.user)
    },
    methods: {
      ...mapActions('user', [
        'getUserAction'
      ]),
      ...mapActions([
        'getDetail'
      ]),
      // 点击 下载表格的方法
      downForm () {
        this.activeBtnForm = true
        window.myapi.downDevItemData({}).then(res => {
          if (res.status === 200) {
            let url = window.URL.createObjectURL(new Blob([res.data], {type: res.data.type}))
            let filename = decodeURI(res.headers['content-disposition'].split(';')[1].trim().substr(
              'filename='.length))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', filename)
            document.body.appendChild(link)
            link.click()
            this.activeBtnForm = false
          } else {
            let msg = res.data.msg ? res.data.msg : '请求数据失败!'
            this.$Message.error({content: msg, duration: 5, closable: true})
          }
        }).catch(function (e) {
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
