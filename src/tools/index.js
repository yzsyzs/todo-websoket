import moment from 'moment'
// 定时器封装函数
export const _timerFun = s => {
  let count = 0
  const time = () => {
    this.timer = setTimeout(() => {
      count += 3
      if (count > 30) {
        clearTimeout(this.timer)
        count = 0
      }
      this.refreshData()
      time()
    }, s)
  }
  time()
}
/**
 * 获取地址栏参数，name:参数名称
 */
export const getUrlParms = (name, bool) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  if (bool) {
    var r = decodeURIComponent(window.location.search).substr(1).match(reg)
  } else {
    var r = window.location.search.substr(1).match(reg)
  }

  if (r !== null) {
    return unescape(r[2])
  }
  return null
}
//判断是否是数组的 方法
export const isArr = val => {
  return Object.prototype.toString.call(val) === '[object Array]'
}
//克隆方法
export const extend = (obj1, obj2) => {
  for (var k in obj2) {
    obj1[k] = obj2[k]
  }
}
//深度克隆方法
export const cloneObj = obj => {
  var str, newobj = obj.constructor === Array ? [] : {}
  if (typeof obj !== 'object') {
    return
  } else if (window.JSON) {
    str = JSON.stringify(obj), //系列化对象
      newobj = JSON.parse(str) //还原
  } else {
    for (var i in obj) {
      newobj[i] = typeof obj[i] === 'object' ?
        cloneObj(obj[i]) : obj[i]
    }
  }
  return newobj
}
//  闭包
export const closure = () => {
  let count = 1
  let a = () => {
    return ++count
  }
  return a
}
let getClosure = closure()
console.log(getClosure())

// 数组去重
export const arrSetNum = arr => {
  if (isArr(arr)) {
    return [...new Set(arr)]
  } else {
    return false
  }
}

// 一个 长度10的数组 怎么随机取出其中5个单项 组成新的数组, 要保证不能重复
let arr = Array.from(Array(10), (v, k) => k + 1)
export const getRandomFiveNums = arr => {
  let retArr = [], hash = {}
  while (retArr.length < 5) {
    let index = (Math.random() * 10) | 0
    if (!hash[index]) {
      hash[index] = 1
      retArr.push(arr[index])
    }
  }
  return retArr
}
getRandomFiveNums(arr)
// 生成 12 个数的数组 当月份
let arr12 = Array.from(Array(12), (v, k) => {
  if (k < 9) return '0' + (k + 1)
  return '' + (k + 1)
})

export const tools = {

  // 获取某个时间点的10位时间戳
  getTimestamp: function (hour, min, second) {
    return (new Date(new Date().setHours(hour || 0, min || 0, second || 0, 0)) / 1000)
  },

  //标准日期转换为一般日期
  standTosimple: function (tm, str, HHMM) {
    var sym, tmdate
    sym = (str == undefined ? '-' : str)

    function autoFull (str) {
      if (str < 10) {
        return 0 + str.toString()
      } else {
        return str
      }
    }

    var date = new Date(tm)
    var year = date.getFullYear()
    var month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    var day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
    var hour = autoFull(date.getHours())
    var minute = autoFull(date.getMinutes())
    var second = autoFull(date.getSeconds())
    //秒级
    if (HHMM) {
      tmdate = date.getFullYear() + sym + month + sym + day + ' ' + hour + ':' + minute + ':' + second
    } else {
      tmdate = year + sym + month + sym + day
    }
    return tmdate
  },
  //时间戳转换成日期
  timeStampToDate: function (tm, str) {
    var tmdate, sym
    var sym = (str == undefined ? '-' : str)

    function autoFull (str) {
      if (str < 10) {
        return 0 + str.toString()
      } else {
        return str
      }
    }

    if (tm) {
      tm = Number(tm)
      tm = tm * (Math.pow(10, (13 - tm.toString().length)))
      var date = new Date(tm)
      var month = autoFull((date.getMonth() + 1))
      var day = autoFull(date.getDate())
      var hour = autoFull(date.getHours())
      var minute = autoFull(date.getMinutes())
      var second = autoFull(date.getSeconds())
      tmdate = date.getFullYear() + sym + month + sym + day + ' ' + hour + ':' + minute + ':' + second
    } else {
      return undefined
    }
    return tmdate
  },
  //获取当前日期的年、月、日
  dateToYearAndMonth: function (tm) {
    var tmDate = new Date(tm)
    var needTime = {
      'year': tmDate.getFullYear(),
      'month': tmDate.getMonth() + 1,
      'day': tmDate.getDate(),
    }
    return needTime
  },
  //日期转换时间戳
  dateToTimeStamp: function (date, num) {
    if (date != undefined) {
      var tm = num ? Date.parse(new Date(date)) : Date.parse(new Date(date)) / 1000
    } else {
      return
    }
    return tm
  },
  //图片压缩拼接字符串
  imgCompress: function (str, strScale) {
    if (str) {
      var arr = str.split('.')
      arr[arr.length - 2] += '_' + strScale
      var imgUrl = arr.join('.')
      return imgUrl
    } else {
      return
    }
  },
  //计算某月有多少周，每周的起始日期
  DateInfo: function (tmDate, rankWeek, rankWeekday) {
    var tm = new Date(tmDate)
    var oldDate = new Date(tm)
    var month = oldDate.getMonth() + 1
    var year = oldDate.getFullYear()
    var newDate = year + '/' + month + '/01'
    //当前月的第一天是周几
    var weektime = new Date(newDate).getDay() == 0 ? 7 : new Date(newDate).getDay()
    //当前月一共多少天
    var newDays = getDays(newDate)
    //当前月一共多少周
    var weeks = null
    if (weektime == 1) {
      weeks = newDays % 7 == 0 ? parseInt(newDays / 7) : parseInt(newDays / 7) + 1
    } else if (weektime == 7) {
      weeks = (newDays - 1) % 7 == 0 ? parseInt((newDays - 1) / 7) + 1 : parseInt((newDays - 1) / 7) + 2
    } else {
      weeks = (newDays - 7 + weektime) % 7 == 0 ? parseInt((newDays - 7 + weektime) / 7) + 1 : parseInt((newDays - 7 + weektime) / 7) + 2
    }
    //当前日期是本月多少周
    var w = tm.getDay()
    var d = tm.getDate()
    var rankweeks = Math.ceil((d + 6 - w) / 7)
    //计算每周开始和结束的时间
    var weekDays = []
    for (var i = 1; i <= weeks; i++) {
      var startTime = null
      var endTime = null
      if (weektime == 1) {
        startTime = 7 * (i - 1) + 1 > newDays ? newDays : 7 * (i - 1) + 1
        endTime = 7 * i > newDays ? newDays : 7 * i
        var timeObj = {
          'startTime': startTime,
          'endTime': endTime
        }
        weekDays.push(timeObj)
      } else {
        if (i == 1) {
          startTime = 1
          endTime = 8 - weektime
        } else {
          startTime = 7 * (i - 2) + (8 - weektime + 1) > newDays ? newDays : 7 * (i - 2) + (8 - weektime + 1)
          endTime = 7 * (i - 1) + (8 - weektime) > newDays ? newDays : 7 * (i - 1) + (8 - weektime)
        }
        var timeObj = {
          'startTime': startTime,
          'endTime': endTime
        }
        weekDays.push(timeObj)
      }
    }
    var howManyDay
    if (rankWeekday) {
      for (var i = 0; i < weekDays.length; i++) {
        //获取这一天是星期几 星期天转换为7
        var newRankWeekday = new Date(year + '-' + month + '-' + weekDays[i].startTime).getDay()
        newRankWeekday = newRankWeekday == 0 ? 7 : newRankWeekday
        if (i == rankWeek - 1 && i == 0) {
          if (newRankWeekday > rankWeekday) {
            alert('您输入的日期在当月当周不存在')
          } else {
            if (rankWeekday > 0 && rankWeekday < 8) {

              if (newRankWeekday == rankWeekday) {
                howManyDay = weekDays[i].startTime
              } else {
                howManyDay = weekDays[i].startTime + rankWeekday - newRankWeekday
              }
              //alert("第" + rankWeek + "周，周" + rankWeekday + "是" + month + "月" + howManyDay + "号");
            } else {
              alert('您输入的日期不正确')
            }
          }
        } else if (i == rankWeek - 1) {
          if (rankWeekday > 0 && rankWeekday < 8) {
            if (newRankWeekday == rankWeekday) {
              howManyDay = weekDays[i].startTime
            } else {
              howManyDay = weekDays[i].startTime + rankWeekday - 1
            }
            //alert("第" + rankWeek + "周，周" + rankWeekday + "是" + month + "月" + howManyDay + "号");
          } else {
            alert('您输入的日期不正确')
          }

        }
      }
    }

    //计算当前月份有多少天
    function getDays (t) {
      //构造当前日期对象
      var date = new Date(t)
      //获取年份
      var year = date.getFullYear()
      //获取当前月份
      var mouth = date.getMonth() + 1
      //定义当月的天数；
      var days
      //当月份为二月时，根据闰年还是非闰年判断天数
      if (mouth == 2) {
        days = year % 4 == 0 ? 29 : 28
      } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days = 31
      } else {
        //其他月份，天数为：30.
        days = 30
      }
      //输出天数
      return days
    }

    var DateInfoList = {
      //几号
      'howManyDay': howManyDay,
      //那一年
      'year': year,
      //几月
      'month': month,
      //每周时间起始点
      'weekDays': weekDays,
      //当月一共多少天
      'newDays': newDays,
      //有多少周
      'weeks': weeks,
      //当前日期是本月多少周
      'rankweeks': rankweeks
    }
    return DateInfoList
  }
}

/*
 * 把图片转成 base64
 */
export const changeImgToBase64 = (imgUrl, callback) => {
  let image = new Image()
  image.src = imgUrl
  image.onload = function () {
    let base64 = getBase64Image(image)
    callback && callback(base64)
  }
}

function getBase64Image (img) {
  var canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  var ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  var dataURL = canvas.toDataURL('image/png')
  return dataURL
}

/*
 * 显示对象或者值的类型
 * return：Object | String | Array | Number | Boolean | Null | Undefined
 */
export const showObjType = (obj) => {
  var res = Object.prototype.toString.apply(obj)

  // res 的格式是 '[object 类型]',所以要取类型的字段的话从第 8 位开始
  return res.substring(8, res.length - 1)
}

/*
 * day: 传入的天数,时间戳或者2017-10-10格式
 * return: 显示某一天对应是周几
 */
export const showWeekOfDay = (day) => {
  if (!day) return {}
  let week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  let index = new Date(day).getDay()
  return {
    time: week[index],
    index: index
  }
}

/*
 * val: 传入的参数，格式为：2017-10-10
 * return: 把2017-10-10转化为2017年10月10日
 */
export const changIntoChineseDateMod = (val) => {
  return val.split('-').map((item, index) => {
    if (index === 0) return item + '年'
    if (index === 1) return item + '月'
    if (index === 2) return item + '日'
  }).join('')
}

/*
 * val: 传入的参数，格式为：2017年10月10日
 * return: 把2017-10-10转化为2017年10月10日
 */
export const changChineseModIntoTimestamp = (val) => {
  if (!val) return
  let y = '年', m = '月', d = '日'
  let year = val.split(y)[0], month = val.split(m)[0].split(y)[1], day = val.split(m)[1].split(d)[0]
  let res = ''
  if (month) res = year + '-' + month
  if (day) res = year + '-' + month + '-' + day
  return new Date(res).getTime()
}


/*
 * currentDayTimestamp: 当前日期的时间戳
 * index：当前日期在周列表中位于第几位
 * return: 返回当前日期所在的一周时间
 * TODO 容错性差，有待优化, 用的时候最好try catch一下
 */
export const cal = (currentDayTimestamp, index) => {
  let res = []
  // 当前日期为周末
  if (index === 0) {
    for (let i = 0; i < 7; i++) {
      let timestamp = currentDayTimestamp + (7 - i - 1) * 86400000
      res.unshift({value: moment(timestamp).format('MM-DD'), timestamp: timestamp})
    }
  } else {
    let bef = [], aft = []
    for (let j = 0; j < index; j++) {
      let timestamp = currentDayTimestamp - (j + 1) * 86400000
      bef.unshift({value: moment(timestamp).format('MM-DD'), timestamp: timestamp})
    }
    for (let k = index; k < 7; k++) {
      let timestamp = currentDayTimestamp + (7 - k - 1) * 86400000
      aft.unshift({value: moment(timestamp).format('MM-DD'), timestamp: timestamp})
    }
    res = bef.concat(aft)
  }
  res = res.map((item) => {
    item.value = item.value.split('-').join('月') + '日'
    return item
  })
  return res
}

/*
 * year: 年份
 * month: 月份
 * return: 返回月份总共的天数
 */
export const getCountDays = (year, month) => {
  var year = year, month = month, date = new Date()
  if (!year) year = date.getFullYear()
  if (!month) month = (date.getMonth() == 0) ? 12 : (date.getMonth() + 1)
  var d = new Date(year, month, 0)
  return d.getDate()
}

/*
 * 组件exportForm 需要的数据格式
 */
export const getExportFormComItem = (params) => {
  let items = Object.keys(params), ret = []
  if (!items || items.length === 0) return ret
  items.forEach((item, index) => {
    let i = {}
    i.key = item
    i.value = params[item]
    ret.push(i)
  })
  return ret
}

/**
 * 校验开始时间跟结束时间
 */
export const compareStartTimeAndEndTime = (startTime, endTime) => {
  if ((startTime && !endTime) || (!startTime && endTime)) {
    return {
      success: false,
      msg: '必须同时选择开始时间和结束时间'
    }
  }
  if (tools.dateToTimeStamp(startTime) - tools.dateToTimeStamp(endTime) > 0) {
    return {
      success: false,
      msg: '结束时间必须大于开始时间'
    }
  }
  if (tools.dateToTimeStamp(endTime) - tools.dateToTimeStamp(startTime) >= 60 * 60 * 24 * 31) {
    return {
      success: false,
      msg: '结束时间和开始时间相差不能超过31天'
    }
  }
  return {
    success: true,
    msg: 'OK'
  }
}
