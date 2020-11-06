import axios from 'axios';
import { Toast } from 'antd-mobile'
import api from '../config/config'

const APIUtils = {
  base: api.apiBaseUrl,
  jsonBaseUrl: api.jsonBaseUrl,
  XML2jsobj: function (node) {
    var data = {};

    // append a value
    function Add(name, value) {
      if (data[name]) {
        if (data[name].constructor != Array) {
          data[name] = [data[name]];
        }
        data[name][data[name].length] = value;
      }
      else {
        data[name] = value;
      }
    }

    // element attributes
    var c, cn;
    if (node.attributes) {
      for (c = 0; cn = node.attributes[c]; c++) {
        Add(cn.name, cn.value);
      }
    }

    // child elements
    for (c = 0; cn = node.childNodes[c]; c++) {
      if (cn.nodeType == 1) {
        if (cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) {
          // text value
          Add(cn.nodeName, cn.firstChild.nodeValue);
        }
        else {
          // sub-object
          Add(cn.nodeName, this.XML2jsobj(cn));
        }
      }
    }
    return data;
  },
  code: function (d) {
    return d.match(/code="(\d+?)"/g)[0].split('=')[1].replace(/"/g, "")
  },
  /**
   * common post
   * @param url
   * @param params
   * @returns {Promise.<TResult>}
   */
  commonPost: (url, params, type) => {
    let time = new Date().getTime()
    if (type !== 'noLoad') {
      Toast.loading('loading...', 0, null);
    }
    if (Object.prototype.toString.call(params) !== '[object Object]') {
      params = {}
    }
    return axios({
      url: APIUtils.base + url,
      method: 'post',
      data: params,
      timeout: 10000,
      responseType: 'json',
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
    }).then(res => {
      let time1 = new Date().getTime()
      console.log(url + 'useTime=======' + (time1 - time) / 1000 + 's')
      if (type && type !== 'noLoad') {
        Toast.hide();
      }
      console.log(res, 'res=>')
      return res
    }).catch(error => {
      if (error.response) {
        Toast.info(`Network connection failed ${error.response.status},Please check your network settings and try again later`, 2, null, false)
      } else if (error.request) {
        Toast.info('Network connection failed,Please check your network settings and try again later', 2, null, false)
      } else {
        Toast.info('Network connection failed,Please check your network settings and try again later', 2, null, false)
      }
      console.log(error, '=========')
    })
  },
  /**
   * common get
   * @param url
   * @returns {Promise.<TResult>}
   */
  commonGet: (url, type) => {
    let time = new Date().getTime();
    if (type !== 'noLoad') {
      Toast.loading('loading...', 0, null);
    }
    return axios({
      url: APIUtils.base + url,
      responseType: 'document',
      timeout: 8000,
    }).then(res => {
      let time1 = new Date().getTime();
      console.log(url + 'useTime:' + (time1 - time) / 1000)
      console.log(url + 'Interface return data:', APIUtils.XML2jsobj(res.data.documentElement))
      let serverTime = res.headers['date']
      let obj = APIUtils.XML2jsobj(res.data.documentElement)
      obj.serverTime = serverTime
      if (type !== 'noLoad') {
        Toast.hide();
      }
      return obj
    }).catch(error => {
      console.log(error);
      console.log('url:', url);
      Toast.hide();
      Toast.info('Network connection failed, please check your network settings and try again later', 2, null, false)
      return null
    })
  },
  jsonGet: (url, type) => {
    if (type !== 'noLoad') {
      Toast.loading('loading...', 0, null);
    }
    return axios({
      url: APIUtils.jsonBaseUrl + url,
      responseType: 'json',
      timeout: 8000,
    }).then(res => {
      console.log(url + 'Interface return data========', res.data);
      Toast.hide();
      return res.data;
    }).catch(error => {
      console.log(error);
      if (type !== 'noLoad') {
        Toast.hide();
      }
      Toast.info('Network connection failed, please check your network settings and try again later', 2, null, false)
      return null;
    })
  }
}
export default APIUtils
