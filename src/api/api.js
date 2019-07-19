import axios from 'axios'
import qs from 'qs'

let baseURL = '/apis'
// 开发环境
if (process.env.NODE_ENV === 'development') {
  baseURL = '/apis'
}
// 正式环境
if (process.env.type === 'production') {
  baseURL = '/apis'
}
// 测试环境
if (process.env.type === 'testing') {
  baseURL = '/apis'
}
axios.defaults.baseURL = baseURL

function dealResponse (response) {
  // 登录超时或没有权限跳转到登陆
  let st = response.data.status
  if (st === 555) {
    window.vm.$router.push({path: '/login'})
    let msg = response.data.msg ? response.data.msg : '请重新登陆！'
    window.vm.$Message.error(msg)
    return true
  } else {
    return false
  }
}

// 给post 添加 中断请求
window.sourceData = []

function myAxios (option) {
  // axios post 提交数据，后台获取不到提交的数据解决方案
  if (option.headers === undefined && option.method === 'POST' && option.data) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    // 坑，qs.stringify处理的对象中，key对应的值不能有json字符串（对象or数组）
    option.data = qs.stringify(option.data)
  }
  // 避免数组数据太多
  if (window.sourceData.length > 300) {
    window.sourceData = window.sourceData.slice(200, window.sourceData.length)
  }
  let source = axios.CancelToken.source()
  window.sourceData.push(source)
  option.cancelToken = source.token
  return axios(option).then(function (response) {
    if (dealResponse(response)) {
      return
    }
    return Promise.resolve(response)
  }).catch(function (error) {
    if (error.message === '取消请求') {
      // 中断请求返回一个 promise
      return new Promise((resolve, reject) => {
        resolve({status: 999})
      })
    }
    if (dealResponse(error.response)) {
      return
    }
    return Promise.reject(error)
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
  do_put: function (url, data) {
    // 通用 post 接口
    let option = {method: 'PUT', url: url, data: data}
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
