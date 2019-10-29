import axios from 'axios'
// import { Loading, Message } from 'element-ui'
import qs from 'qs'

const getToken = () => {
  return JSON.parse(localStorage.getItem('user'))
}
let baseURL = '/apis'
// 开发环境
if (process.env.NODE_ENV === 'development') {
  baseURL = '/apis'
}
// 正式环境
if (process.env.NODE_ENV === 'production') {
  baseURL = '/apis'
}
// 测试环境
if (process.env.NODE_ENV === 'testing') {
  baseURL = '/apis'
}
axios.defaults.baseURL = baseURL
// 请求拦截器
axios.interceptors.request.use(
  config => {
    console.log(config, 'config请求拦截器')
    //1.全局loadin配置
    /*2.token校验:一般是在登录完成之后,将用户的token通过localStorage或者cookie存在本地;
    然后用户每次在进入页面的时候（即在main.js中），会首先从本地存储中读取token;
    如果token存在说明用户已经登陆过则更新vuex中的token状态;
    然后,在每次请求接口的时候,都会在请求的header中携带token;
    后台人员就可以根据你携带的token来判断你的登录是否过期,如果没有携带,则说明没有登录过。
    v1.每次发送请求之前判断vuex中是否存在token
    v2.如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    v3.即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断*/
    // const token = store.state.token
    // alert(token, 'token')
    // token && (config.headers.Authorization = token)
    config.headers.Authorization = getToken() && getToken().accessToken
    if (config.method == 'post') {
      console.log('post请求统一需要做什么判断')
    }
    //config.headers.Accept = 'application/json'; //规定接受形式json格式
    // showFullScreenLoading() //开启loading
    return config
  }, error => {
    return Promise.reject(error)
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    console.log(response, 'response响应拦截器')
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    //否则的话抛出错误
    if (response.status === 200) {
      // tryHideFullScreenLoading() //关闭loading
      // Message({
      //   showClose: true,
      //   message: '响应成功',
      //   type: 'success'
      // })
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  }, error => {
    console.log(error, 'error')
    if (error.response.data.status) {
      console.log('后台错误码统一处理')
      switch (error.response.data.status) {
        // 401:未登录;未登录则跳转登录页面，并携带当前页面的路径;在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          // router.replace({
          //   path: '/login',
          //   query: {
          //     redirect: router.currentRoute.fullPath
          //   }
          // })
          break
        // 403:token过期;登录过期对用户进行提示;清除本地token和清空vuex中token对象;跳转登录页面
        case 403:
          // Message({
          //   showClose: true,
          //   message: '登录过期，请重新登录',
          //   duration: 1000,
          //   type: 'warning'
          // })
          //清除token
          localStorage.removeItem('user')
          //跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          // setTimeout(() => {
          //   router.replace({
          //     path: '/login',
          //     query: {
          //       redirect: router.currentRoute.fullPath
          //     }
          //   })
          // }, 1000)
          break
        //404请求不存在
        case 404:
          // Message({
          //   showClose: true,
          //   message: '网络请求不存在',
          //   duration: 1000,
          //   type: 'error'
          // })
          break
        //其他错误,直接抛出错误提示
        default:
          // Message({
          //   showClose: true,
          //   message: error.response.data.message,
          //   duration: 1000,
          //   type: 'error'
          // })
      }
    }
    return Promise.reject(error)
  })

const myAxios = option => {
  // axios post 提交数据，后台获取不到提交的数据解决方案
  if (option.headers === undefined && option.method === 'POST' && option.data) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    // 坑，qs.stringify处理的对象中，key对应的值不能有json字符串（对象or数组）
    option.data = qs.stringify(option.data)
  }
  return axios(option).then(res => {
    return Promise.resolve(res.data)
  }).catch(err => {
    return Promise.reject(err.message)
  })
}

// `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
// responseType: 'json', // 默认的
// get传参数用params,
// 'PUT', 'POST', 和 'PATCH'传参数用 data
let api = {
  do_download: function (url, data) {
    // 通用 下载文件 接口
    let option = {method: 'POST', url: url, data: data, responseType: 'blob'}
    return myAxios(option)
  },
  do_gett: function (url, data) {
    // 通用 get 接口
    let option = {method: 'GET', url: url, params: data}
    return myAxios(option)
  },
  do_put: function (url, data) {
    // 通用 post 接口
    let option = {method: 'PUT', url: url, data: data}
    return myAxios(option)
  },
  do_del: function (url, data) {
    // 通用 删除 调用
    let option = {
      method: 'DELETE',
      url: url,
      data: JSON.stringify(data),
      headers: {'Content-Type': 'application/json;charset=UTF-8'}
    }
    return myAxios(option)
  },
  put_post: function (url, data, method) {
    // 通用 post 接口
    let option = {
      method: method,
      url: url,
      data: JSON.stringify(data),
      headers: {'Content-Type': 'application/json;charset=UTF-8'}
    }
    return myAxios(option)
  },
  post_json: function (url, data) {
    // 通用 删除 调用
    let option = {
      method: 'POST',
      url: url,
      data: JSON.stringify(data),
      headers: {'Content-Type': 'application/json;charset=UTF-8'}
    }
    return myAxios(option)
  },
  upload: function (url, data) {
    // 通用上传方法
    let option = {method: 'POST', url: url, data: data, headers: {'Content-Type': 'multipart/form-data'}}
    return myAxios(option)
  },
  kaptcha: function () {
    // 接受二进制流数据
    let option = {method: 'GET', url: '/kaptcha.jpg', responseType: 'blob'}
    return myAxios(option)
  },
  show_pic: function (data) {
    // 接受二进制流数据
    let option = {method: 'POST', url: '/$pic/visit', data: data, responseType: 'arraybuffer'}
    return myAxios(option)
  },
  /*
  *
  * 空压系统 的接口新的 2019年 05月 07 日
  */
  // 7月01 日新需求修改
  getSpaceIdDevs (data) {
    let option = {method: 'POST', url: '/iot/dev/getSpaceIdDevs', data: data}
    return myAxios(option)
  },
  // 定时刷新接口
  postTimer (data) {
    let option = {method: 'POST', url: 'iot/dev/cur', data: data}
    return myAxios(option)
  },
  // 点击各个 机器图片 里面的 下载表格的方法
  downDevItemData (data) {
    let option = {method: 'POST', url: 'iot/dev/downDevItemData', data: data, responseType: 'blob'}
    return myAxios(option)
  }
}

// 新接口 模式 的 类
class Api {
  constructor (data = {}, type = '', flag = false) {
    // 公共请求 需要传 的参数
    this.data = data
    this.type = type
    this.flag = flag
  }

  getData () {
    let option = {
      method: this.type,
      url: '/iot/dev/curData/' + this.data.id,
      data: this.data
    }
    if (this.flag) {
      option['headers'] = {'Content-Type': 'application/json;charset=UTF-8'}
    }
    return myAxios(option)
  }
}

export {
  api,
  Api
}
