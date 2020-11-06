/**
 * 
  * @param time
 * @param cFormat
 * @returns {*}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000
  if (diff < 30) {
    return 'right now'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + 'minutes ago'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + 'hours ago'
  } else if (diff < 3600 * 24 * 2) {
    return 'one day ago'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '.' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
  }
}
export function formatSearch(data) {
  let obj = {}
  let getData = data && data.split('?')[1]
  // 'ada=123&b=11'
  getData.split('&').map((item, index) => {
    obj[item.split('=')[0]] = item.split('=')[1] || ''
  })
  return obj
}
/**
 * 1542332271000=>2018-11-16 09:37:51
 * @param {*} time 
 */
export function FormateTime(time) {
  const d = new Date(time)
  return `${d.getFullYear()}-${d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()} ${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}:${d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()}
    `
}
/**
 * 1542332271000=>07.11.2020  19:03:00
 * @param {*} time 
 */
export function FormateTime_in(time) {
  const d = new Date(time)
  return `${d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}.${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${d.getFullYear()} ${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}:${d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()}`
}

/**
 * get params from link
 */
export function GetUrlParams(location, paraName) {
  const arrStr = location.search;
  const arrOld = arrStr.slice(1, arrStr.length).split('&');
  if (arrOld.length > 0) {
    let newArr = [];
    for (let i = 0; i < arrOld.length; i++) {
      newArr = arrOld[i].split('=');
      if (newArr != null && newArr[0] === paraName) {
        return newArr[1];
      }
    }
    return '';
  } else {
    return '';
  }
}

/**
 *
 * get cookie
 */
export function getCookies(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}

// get minNum-maxNum 
export function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

export var browser = {
  versions: function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE
      presto: u.indexOf('Presto') > -1, //opera
      webKit: u.indexOf('AppleWebKit') > -1, //apple chrome
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//hotfox
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //Mobile
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('Linux') > -1, //android
      iPhone: u.indexOf('iPhone') > -1, //iPhone or QQHD
      iPad: u.indexOf('iPad') > -1, //iPad
      webApp: u.indexOf('Safari') == -1, //
      _weixin: u.toLowerCase().indexOf("micromessenger") > -1,// wechat
      qq: u.match(/\sQQ/i) == " qq" //QQ
    };
  }(),
}

export function debounce(fun, delay = 200) {
  return function (args) {

    let that = this
    let _args = args

    clearTimeout(fun.id)
    fun.id = setTimeout(function () {
      fun.call(that, _args)
    }, delay)
  }
}

export function GetRequest(urlStr) {
  if (urlStr.indexOf('?') < 0) return
  if (typeof urlStr == "undefined") {
    var url = decodeURI(location.search);
  } else {
    var url = "?" + urlStr.split("?")[1];
  }
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}