// import utils from './utils'
import { Toast } from 'antd-mobile'
// const dsBridge = require("dsbridge")

export const browser = {
  versions: function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE
      presto: u.indexOf('Presto') > -1, //opera
      webKit: u.indexOf('AppleWebKit') > -1, // apple、chorme
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//hotfox
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //moblie
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('Linux') > -1, //android
      iPhone: u.indexOf('iPhone') > -1, //iPhone or QQHD
      iPad: u.indexOf('iPad') > -1, //iPad
      webApp: u.indexOf('Safari') == -1, //web
      _weixin: u.toLowerCase().indexOf("micromessenger") > -1,// wechat
      qq: u.match(/\sQQ/i) == " qq" //QQ
    };
  }(),
}

/* Call method in app */
export const AppApi = {
  appShare: function () {

  },
  downLoadApp: () => {

  },
  // openNativeBrowser: (parms) => {
  //   dsBridge.call("openNativeBrowser", parms)
  // },
  // openNativePage: function (parms) {
  //   dsBridge.call("openNativePage", parms)
  // },
};
