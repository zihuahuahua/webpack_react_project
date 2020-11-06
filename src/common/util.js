import moment from "moment";
import { Modal } from "antd-mobile";
import _ from "lodash";
// import {hashHistory} from "react-router";
import { createHashHistory } from 'history';
const hashHistory = createHashHistory();
import config from "./config";

const alert = Modal.alert;
import CryptoJS from "./aes";

let utils = {
  /**
   * @ Get how many days in the past
   * @param days 
   * @param format 
   * @param arr 
   */
  dayMillisecond: 24 * 60 * 60 * 1000,
  getLastDays(days, format) {
    let now = new Date().getTime();
    let arr = [];
    for (let i = 0; i < days; i++) {
      arr.push(moment(now - i * this.dayMillisecond).format(format));
    }
    return arr;
  },

  checkPhone(phone) {
    return /^((13[0-9])|(15[^4,\\d])|(18[0-9])|(14[0-9])|(17[0-9])|(16[0-9])|(19[0-9]))\d{8}$/.test(phone);
  },

  /**
   * 
   * @param data
   * @returns {boolean}
   */
  checkIsNull: data => {
    if (data === null || data.trim() === "" || data === undefined) {
      return true;
    }
    return false;
  },

  /**
   * aes Decrypt
   * @param word
   */
  aesCode: word => {
    let key = CryptoJS.enc.Utf8.parse(config.aes_key);
    let iv = CryptoJS.enc.Utf8.parse(config.aes_iv);
    let dencrypted = CryptoJS.AES.decrypt(word, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    dencrypted = dencrypted.toString(CryptoJS.enc.Utf8);
    return dencrypted;
  },

  /**
   * aes encryption
   * @param word
   * @returns {*}
   */
  aesEnCode: word => {
    // let srcs = CryptoJS.enc.Utf8.parse(word)
    let key = CryptoJS.enc.Utf8.parse(config.aes_key);
    let iv = CryptoJS.enc.Utf8.parse(config.aes_iv);
    let encrypted = CryptoJS.AES.encrypt(word, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    let val = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Hex.parse(encrypted.ciphertext.toString())
    );
    return val;
  },
  // check is Arr
  checkIsArr(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  },


  /**
   *  Add a comma to every three digits of the number
   * @param str
   * @constructor
   */
  NumAddComma(str) {
    return str.replace(/\d(?=(?:\d{3})+\b)/g, "$&,");
  },

  /**
   * Object array sorting
   * @param property 
   * @param type  asc  desc
   * @returns {Function}
   */
  compare(property, type = "asc") {
    return function (obj1, obj2) {
      var value1 = obj1[property];
      var value2 = obj2[property];
      if (type === "asc") {
        return value1 - value2;
      } else {
        return value2 - value1;
      }
    };
  },
  removeEmpty(arr) {
    let a = _.remove(arr, item => {
      if (item) {
        return item;
      }
    });
    return a;
  },

  setUrlHash(key, value) {
    let hash = window.location.hash;
    let str = "";
    if (hash.lastIndexOf("?") !== -1) {
      let arrstr = hash.substring(hash.lastIndexOf('?') + 1);
      let arr1 = arrstr.split("&");
      str = hash.substring(0, hash.lastIndexOf('?')) + "?";
      for (let i = 0, len = arr1.length; i < len; i++) {
        let str1 = "";
        let arr2 = arr1[i].split("=");
        if (arr2[0] === key) {
          str1 = arr2[0] + "=" + value;
        } else {
          str1 = arr2.join("=");
        }
        str += str1;
      }
    } else {
      str = hash + `?${key}=${value}`
    }
    str = str.substring(1);
    return str;

  },
  /*Block default events*/
  onHandler(event) {
    let ev = event || window.event;
    ev.preventDefault();
  },
  /*No touch screen sliding*/
  CancelEvent() {
    document.addEventListener('touchmove', utils.onHandler, false);
  },
  /*Disable touch screen swipe*/
  RemovEvent() {
    document.removeEventListener('touchmove', utils.onHandler, false);
  }
  ,

  /**********************Betting calculation related functions************************************/
  math: {
    /**
     * @description 
     * @param {Int} n 
     * @param {Int} m 
     * @return {Int}
     * @example math.C(6,5);
     * @memberOf math
     */
    C: function (n, m) {
      var n1 = 1,
        n2 = 1;
      for (var i = n, j = 1; j <= m; n1 *= i--, n2 *= j++) {
      }
      return n1 / n2;
    }
    ,
    /**
     * @description 
     * @param {Int} n 
     * @param {Int} m 
     * @return {Int}
     * @example math.P(5,3); 60
     * @memberOf math
     */
    P: function (n, m) {
      var n1 = 1,
        n2 = 1;
      for (var i = n, j = 1; j <= m; n1 *= i--, n2 *= j++) {
      }
      return n1;
    }
    ,
    /**
     * @description 
     * @param {Int} n 
     * @param {Int|Array} m 
     * @return {Int}
     * @example math.Cs(4,3);  [[1,2,3],[1,2,4],[1,3,4],[2,3,4]]
     * @memberOf math
     */
    Cs: function (len, num) {
      var arr = [];
      if (typeof len == "number") {
        for (var i = 0; i < len; i++) {
          arr.push(i + 1);
        }
      } else {
        arr = len;
      }
      var r = [];
      (function f(t, a, n) {
        if (n == 0) return r.push(t);
        for (var i = 0, l = a.length; i <= l - n; i++) {
          f(t.concat(a[i]), a.slice(i + 1), n - 1);
        }
      })([], arr, num);
      return r;
    }
    ,
    /**
     * @description 
     * @param {Array} spArr [2,2,1] 
     * @param {Int} n 
     * @return {Int}
     * @example math.N1([2,2,1],3);
     * @memberOf math
     */
    N1: function (spArr, n) {
      var zhushu = 0;
      var m = spArr.length; //
      var arr = utils.math.Cs(m, n);
      for (var i = 0; i < arr.length; i++) {
        var iTotal = 1; //
        for (var j = 0; j < arr[i].length; j++) {
          iTotal *= spArr[arr[i][j] - 1];
        }
        zhushu += iTotal;
      }
      return zhushu;
    }
    ,
    /**
     * @description 
     * @param {Array} spArrd [[3,3,3,1,2],[1,1,1,1,0]] 
     * @param {Int} n n串1
     * @return {Int}
     * @example math.N1d([[3,3,3,1,2],[1,1,1,1,0]],5); 
     * @example math.N1d([[3,3,3,1,2],[1,0,0,0,0]],3); 
     * @memberOf math
     */
    N1d: function (spArrd, n) {
      var nArr = [],
        dArr = [];
      try {
        for (var i = 0; i < spArrd[1].length; i++) {
          if (spArrd[1][i] == 1) {
            dArr.push(spArrd[0][i]);
          } else {
            nArr.push(spArrd[0][i]);
          }
        }
      } catch (e) {
        return 0;
      }
      if (dArr.length <= n) {
        return (
          utils.math.N1(nArr, n - dArr.length) *
          utils.math.N1(dArr, dArr.length)
        );
      } else {
        return 0;
      }
    }
    ,
    /**
     * @description 
     * @param {} startNum   
     * @param {} totalNum   
     * @param {} len        
     * @param {} a          
     * @param {Array} rep      
     * @param {String} con     
     * @param {String} hour    
     * @return {Array}
     * @example math.random(1,35,5); 机选1-35之间5不重复个数字 return [4,12,16,8,34,9]
     * @example math.random(1,12,2,true); 机选 return [4,4]
     * @example math.random(1,11,5,null,[],'dlcr5xz1') 幸运选号
     * @memberOf math   1 10 5
     */
    random: function (startNum, totalNum, len, a, rep, con, hour) {
      var absNum = Math.abs(startNum - totalNum) + 1;
      var repL = 0;
      var luckCon = (con && con.split("")) || [];
      if (typeof rep == "object") {
        repL = rep.length;
      }
      if (
        typeof len == "undefined" ||
        len > absNum ||
        len < 1 ||
        len > absNum - repL
      ) {
        return [];
      }

      var o = {},
        _r = new Array(len),
        i = 0,
        s,
        j = 1;
      if (luckCon.length > 0 && utils.Cookie.get(con) !== "") {
        return utils.Cookie.get(con).split(",");
      } else {
        while (i < len) {
          s = parseInt(Math.random() * absNum + startNum);
          if (!a) {
            s = (function (a, s) {
              for (var i = 0; i < a.length;) {
                if (a[i++] == s) return null;
                if (typeof rep == "object") {
                  for (var j = 0; j < repL; j++) {
                    if (s == rep[j]) return null;
                  }
                }
              }
              return s;
            })(_r, s);
            s !== null && (_r[i++] = s);
          } else {
            _r[i++] = s;
          }
        }
        if (luckCon.length > 0) {
          hour = (hour || 1) - new Date().getMinutes() / 60;
          utils.Cookie.set(con, _r.join(","), null, null, hour);
        }
      }
      return _r;
    }
    ,
    /**
     * @description 
     * @param {String|Nubmer|Array} obj 
     * @return {String}
     * @example
     utils.padArray([1,5,10,11]);//['01','05','10','11']
     utils.padArray(5);//'05'
     utils.padArray(5,3);//'005'

     * @memberOf utils
     */
    padArray: function (obj, length) {
      if (obj instanceof Array) {
        for (var j = 0, _max = obj.length; j < _max; j++) {
          var i = Number(obj[j]);
          obj[j] = utils.math.pad(i, length || 2);
        }
      }
      return obj;
    }
    ,

    /**
     * @description 
     * @param {String} source 
     * @param {Int} [length:true] 
     * @example utils.pad(9,2);return 09
     * @example utils.pad(9,3);return 009
     * @memberOf utils
     */
    pad: function (source, length) {
      var pre = "",
        negative = (source < 0),
        string = String(Math.abs(source));
      if (string.length < length) {
        pre = (new Array(length - string.length + 1)).join('0');
      }
      return (negative ? "-" : "") + pre + string;
    }
    ,
    /**
     * 
     * @param arr
     */
    sort(arr) {
      return arr.sort((a, b) => {
        return a - b
      })
    }
  }
  ,

  // 
  Count: {
    /**
     * @description 
     * @param {Array} arr 
     * @param {Array} guoguan 
     * @return {obj}
     * @example utils.Count.prix([{max:'2',min:'1'},{max:'4',min:'2'}],[1,2]);return {max:XX,min:OO}
     */
    prix: function (arr, guoguan) {
      var gg_ = guoguan,
        min_pl = [],
        max_pl = [];
      arr.map(function (sp) {
        max_pl.push(+sp.max);
        min_pl.push(+sp.min);
      });
      if (!max_pl.length || !gg_) {
        return {
          min: 0,
          max: 0
        };
      } else {
        var pz = utils.Count.max_prize(max_pl, gg_);
        var minpz = 1;
        minpz = utils.Count.min_prize(min_pl, gg_);
        return {
          min: minpz,
          max: pz
        };
      }
    }
    ,
    /**
     * @description 
     * @param {Array} arr 
     * @param {Array} guoguan 
     * @return {Int}
     * @example utils.Count.max_prize(['3.1', '2.2', '5.5', '1.9'],[2,3]);return 1234
     */
    max_prize: function (arr, guoguan) {
      var max_prize = 0;
      var Q = guoguan;
      _.each(Q, function (value) {
        var _n = parseInt(value) || 1;
        var cl = utils.Count.cl(arr, _n);
        _.each(cl, function (b) {
          var x = 1;
          _.each(b, function (d) {
            x *= d;
          });
          max_prize += x;
        });
      });
      max_prize *= 2;
      return (max_prize = (+max_prize).toFixed(8));
    }
    ,
    /**
     * @description 
     * @param {Array} arr 
     * @param {Array} guoguan 
     * @return {Int}
     * @example utils.Count.max_prize(['3.1', '2.2', '5.5', '1.9'],[2,3]);return 2
     */
    min_prize: function (arr, guoguan) {
      var min_prize = 0;
      var Q = guoguan;
      _.each(Q, function (value) {
        var _n = parseInt(value) || 1;
        var cl = utils.Count.cl(arr, _n);
        _.each(cl, function (b) {
          var x = 1;
          _.each(b, function (d) {
            x *= d;
          });
          if (x < min_prize || min_prize == 0) {
            min_prize = x;
          }
        });
      });
      min_prize *= 2;
      return (min_prize = (+min_prize).toFixed(8));
    }
    ,
    /**
     * @description 
     * @param {Array} arr 
     * @param {String} n 
     * @return {Int}
     * @example utils.Count.cl(['3.1', '2.2', '5.5', '1.9'],'2');return 2
     */

    cl: function (arr, n, z) {
      // z is max count
      var r = [];
      fn([], arr, n);
      return r;

      function fn(t, a, n) {
        if (n === 0 || (z && r.length == z)) {
          return (r[r.length] = t);
        }
        for (var i = 0, l = a.length - n; i <= l; i++) {
          if (!z || r.length < z) {
            fn(t.concat(a[i]), a.slice(i + 1), n - 1);
          }
        }
      }
    }
  }
  ,
  Cookie: {
    /**
     * @description setcookie
     * @param {String} name 
     * @param {String} value 
     * @param {String} [domain:tenpay.com] 
     * @param {String} [path:/] 
     * @param {String} [hour] 
     * @example CP.Cookie.set('cp_pagetype', 'page', 'tenpay.com');
     * @memberOf CP.Cookie
     */
    set: function (name, value, domain, path, hour) {
      if (hour) {
        var now = new Date();
        var expire = new Date();
        expire.setTime(parseFloat(now.getTime()) + 3600000 * hour);
      }
      document.cookie =
        name +
        "=" +
        value +
        "; " +
        (hour ? "expires=" + expire.toUTCString() + "; " : "");
    }
    ,
    /**
     * @description set cookie
     * @param {String} name 
     * @example CP.Cookie.get('cp_pagetype'); "page"
     * @memberOf CP.Cookie
     */
    get: function (name) {
      var re = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)");
      var result = document.cookie.match(re);
      return !result ? "" : result[1];
    }
    ,
    /**
     * @description del cookie
     * @param {String} name 
     * @param {String} [domain:tenpay_com] 
     * @param {String} [path:/] 
     * @example CP.Cookie.del('cp_pagetype');
     * @memberOf CP.Cookie
     */
    del: function (name, domain, path) {
      if (domain === null) {
        document.cookie =
          name +
          "=; expires=Mon, 2 Mar 2009 19:00:00 UTC; path=" +
          (path || "/");
      } else {
        document.cookie =
          name +
          "=; expires=Mon, 2 Mar 2009 19:00:00 UTC; path=" +
          (path || "/") +
          "; domain=" +
          (domain || "qq.com") +
          ";";
      }
    }
  },
  Shake: function () {
    var SHAKE_THRESHOLD = 1500;
    var last_update = 0;
    var x, y, z, last_x, last_y, last_z;
    var callBack = null;

    function deviceMotionHandler(eventData) {
      var acceleration = eventData.accelerationIncludingGravity;

      var curTime = new Date().getTime();

      if ((curTime - last_update) > 100) {

        var diffTime = curTime - last_update;
        last_update = curTime;

        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;

        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > SHAKE_THRESHOLD) {
          callBack && callBack();
        }
        last_x = x;
        last_y = y;
        last_z = z;
      }
    }

    var run = function (call) {
      callBack = call;
    };
    var init = function () {
      if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
      }
    }
    init();
    return {
      run: run
    }
  }(),

  /**
   * 
   * @param url
   * @constructor
   */
  CreateScriptEl(url) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild(script);
    return;
  },
  /**
   * source sort
   * HostBlackAry 
   * @returns {*}
   * @constructor
   */
  HostCheck() {
    let host = location.host
    let GetSource = ~~localStorage.getItem('agent')
    let HostBlackAry = []
    let ShowType;
    if (HostBlackAry.indexOf(host) !== -1) {
      ShowType = 1
    } else {
      // ShowType = GetSource>=3005&&GetSource<3999? '2':'1'
      ShowType = GetSource >= 3000 && GetSource < 3999 ? '2' : '1'
    }
    return ShowType
  }
};

export default utils;
