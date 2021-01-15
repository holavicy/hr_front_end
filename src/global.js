import axios from 'axios'

// 上传文件
function uploadFile (url, payload) {
  return new Promise(function (resolve, reject) {
    axios({
      baseURL: 'http://222.186.81.37:5000/giftApi/api',
      url: url,
      method: 'post',
      data: payload
    }).then(res => {
      resolve(res)
    }).catch(thrown => {
      reject(thrown)
    })
  })
}

export default {
  install: function (Vue) {
    Vue.prototype.uploadFile = (url, payload) => uploadFile(url, payload)
    Vue.prototype.HOST_FILES = 'http://192.168.40.161:5000/hr/'
  }
}
