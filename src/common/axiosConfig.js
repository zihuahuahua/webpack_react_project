import axios from 'axios'
import { Toast } from 'antd-mobile'
import { createHashHistory } from 'history';
const hashHistory = createHashHistory();
import { getCookie, setCookie, getLocalStorage, removeLocalStorage } from './auth'
// import {AppApi} from './AppApi'

// request
let getAppCookieData = ''
// try{
// getAppCookieData=JSON.parse(AppApi.getCookieByName(''))
// }catch(e){
//     getAppCookieData=''
// }
axios.interceptors.request.use(config => {
  //Filter profile request 
  let agent = getLocalStorage('notifyAppsFlyerData') && JSON.parse(getLocalStorage('notifyAppsFlyerData')).campaign || ''
  if (!(config.method === 'get' && config.responseType === 'json' && config.url.indexOf('json') !== -1)) {
    config.headers['accessToken'] = getCookie('accessToken') || getLocalStorage('accessToken') || getAppCookieData['accessToken'] || ''
    config.headers['appName'] = getCookie('appName') || getAppCookieData['appName'] || 'PC_H5_LOT'
    config.headers['appVersion'] = getCookie('appVersion') || getAppCookieData['appVersion'] || ''
    config.headers['source'] = getCookie('source') || getAppCookieData['source'] || '20000'
    config.headers['imei'] = getCookie('imei') || getAppCookieData['imei'] || ''
    config.headers['agent'] = getCookie('agent') || agent || getLocalStorage('agent') || getAppCookieData['agent'] || ''
    config.headers['inviteCode'] = getCookie('inviteCode') || getAppCookieData['inviteCode'] || ''
    config.headers['areaCode'] = getCookie('areaCode') || getAppCookieData['areaCode'] || ''
    config.headers['osVersion'] = getCookie('osVersion') || getAppCookieData['osVersion'] || ''
    config.headers['phoneModel'] = getCookie('phoneModel') || getAppCookieData['phoneModel'] || ''

    // console.log('accessToken:=>', getCookie('accessToken'))
    // console.log('appMuId:=>', getCookie('appMuId'))
    // console.log('appId:=>', getCookie('appId'))
  }
  return config
}, error => {
  console.log(error) // for debug
  return Promise.reject(error)
})
var count = 4
function goLoginPage() {
  count--;
  if (count <= 0) {
    setCookie("flag", 'needBack')
    removeLocalStorage('accessToken')
    setTimeout(() => {
      hashHistory.push('/login')
    }, 10);
  }
  else {
    setTimeout(goLoginPage, 1000);
  }
}
// response interceptor
axios.interceptors.response.use(
  response => {
    const { code, msg } = response.data
    console.log(response.data, msg, 'response.data')
    if (code !== '0') {
      if (code == 2006) {
        Toast.info(msg, 3)
        setTimeout(goLoginPage, 1000);
      } else {
        Toast.info(msg)
      }
    }
    return response.data
    // return Promise.resolve(response,data)
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)
